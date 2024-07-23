import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { firestore } from "@/firebase/firebaseConfig";
import { collection, doc, writeBatch } from "firebase/firestore";
import { NewsResponse } from "@/types/news";
import { v4 as uuid } from "uuid";
import { setImprovedCrawlerPerformance } from "./setImprovedCrawlerPerformance";
import parseToTimestamp from "../parseToTimestmp";

const stockList = {
  AAPL: "AAPL.O",
  AMZN: "AMZN.O",
  TSLA: "TSLA.O",
  MSFT: "MSFT.O",
  GOOGL: "GOOGL.O",
  U: "U",
  GPRO: "GPRO.O",
  HOOD: "HOOD.O",
  AVGO: "AVGO.O",
  NVDA: "NVDA.O",
  SAVA: "SAVA.O",
  KODK: "KODK.O",
  PTON: "PTON.O",
};

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

const saveDataToFirestore = async (data: any[]) => {
  const db = firestore;

  // 데이터를 입력한 개수로 나누기
  const chunkedData = chunkArray(data, 50);

  // 각 데이터 조각에 대해 Firestore batch를 사용하여 데이터를 저장
  for (const chunk of chunkedData) {
    const batch = writeBatch(db);
    chunk.forEach((item) => {
      const docRef = doc(collection(db, "news", "stockNews", "articles"));
      batch.set(docRef, item);
    });
    await batch.commit();
  }
};

function getSpecifiedDate() {
  const today = new Date();
  return today.setDate(today.getDate() - 5);
}

export const getStockWorldNews = async () => {
  try {
    let newsItems: NewsResponse[] = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await setImprovedCrawlerPerformance(page);

    for (const [key, value] of Object.entries(stockList)) {
      let pageCount = 1;
      let allData: any[] = [];

      // 페이지를 늘리면서 특정 기간의 데이터 수집
      while (true) {
        const response = await fetch(
          `https://api.stock.naver.com/news/worldStock/${value}?pageSize=20&page=${pageCount}`,
        );
        const data = await response.json();
        const timestampDate = getSpecifiedDate();

        const recentData = data.filter((item: any) => {
          const date = item.dt;
          const year = date.slice(0, 4);
          const month = date.slice(4, 6);
          const day = date.slice(6, 8);

          const itemDate = `${year}-${month}-${day}`;
          const itemTimestamp = new Date(itemDate).getTime();

          return itemTimestamp >= timestampDate;
        });

        // 기간 조건에 맞는 데이터가 없는 경우 while 루프 종료
        if (recentData.length === 0) {
          break;
        }
        allData = [...allData, ...recentData];
        pageCount += 1;
      }

      let urls = allData.map((data) => `https://m.stock.naver.com/investment/news/worldnews/${data.oid}/${data.aid}`);

      for (let url of urls) {
        try {
          await page.goto(url);

          const html = await page.content();
          const $ = cheerio.load(html);

          const newsData: NewsResponse = {
            newsId: uuid(),
            relatedStocks: key,
            headLine: $("meta[property='og:title']").attr("content") as string,
            description: $(".tr-story-p1").text() as string,
            contents: $(".storyContent").text().replace(/[\t]/g, ""),
            image: $(".storyContent > p > img").first().attr("src") || "",
            creationTime: parseToTimestamp($(".HeaderNews_time__OB6JL").first().text().replace("입력 ", "")),
            media: $(".HeaderNews_link_press__Nx0pU img").attr("alt") as string,
            category: "",
          };
          newsItems.push(newsData);
        } catch (error) {
          console.error(`Error processing URL ${url}: `, error);
        }
      }
    }

    await browser.close();
    await saveDataToFirestore(newsItems);
  } catch (error) {
    console.error("Error: ", error);
  }
};
