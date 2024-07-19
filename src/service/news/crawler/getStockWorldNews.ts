import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { firestore } from "@/firebase/firebaseConfig";
import { addDoc, collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { NewsResponse } from "@/types/news";
import { uuid } from "uuidv4";
import { setImprovedCrawlerPerformance } from "./setImprovedCrawlerPerformance";
import parseToTimestamp from "./parseToTimestmp";

const stockList = {
  AAPL: "AAPL.O",
  AMZN: "AMZN.O",
  TSLA: "TSLA.O",
  MSFT: "MSFT.O",
  GOOGL: "GOOGL.O",
  U: "U",
};

const stockCollectionMap = {
  AAPL: "AAPL",
  AMZN: "AMZN",
  TSLA: "TSLA",
  MSFT: "MSFT",
  GOOGL: "GOOGL",
  U: "U",
} as { [key: string]: string };

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

const saveDataToFirestore = async (data: any[], collectionName: string) => {
  const db = firestore;

  // 데이터를 500개씩 나눕니다.
  const chunkedData = chunkArray(data, 500);

  // 각 데이터 조각에 대해 Firestore batch를 사용하여 데이터를 저장합니다.
  for (const chunk of chunkedData) {
    const batch = writeBatch(db);
    chunk.forEach((item) => {
      const docRef = doc(collection(db, "news", "stockNews", "worldNews", collectionName, "articles"));
      batch.set(docRef, item);
    });
    await batch.commit();
  }
};

export const getStockWorldNews = async () => {
  setImprovedCrawlerPerformance();

  try {
    // API를 이용해 데이터 가져오기
    const pageSize = 20;

    for (const [key, value] of Object.entries(stockList)) {
      let page = 1;
      let allData: any[] = [];

      // page 를 늘리면서 빈 페이지가 나올때까지 데이터 수집
      while (true) {
        const response = await fetch(
          `https://api.stock.naver.com/news/worldStock/${value}?pageSize=${pageSize}&page=${page}`,
        );
        const data = await response.json();

        // 기사가 없는 빈 페이지는 빈 배열이 나오기 때문에 빈 배열일 때 데이터 수집 멈추기
        if (data.length === 0) {
          break;
        }

        allData = [...allData, ...data];

        page += 1;
      }

      let urls = allData.map((data) => `https://m.stock.naver.com/investment/news/worldnews/${data.oid}/${data.aid}`);
      let newsItems: NewsResponse[] = [];

      const browser = await puppeteer.launch(); // 브라우저 실행

      for (let url of urls) {
        try {
          const page = await browser.newPage(); // 새로운 페이지 열기
          await page.setViewport({
            width: 1920,
            height: 1080,
          });
          await page.goto(url);

          const html = await page.content();
          const $ = cheerio.load(html);

          const newsData: NewsResponse = {
            newsId: uuid(),
            relatedStocks: key,
            headLine: $("meta[property='og:title']").attr("content") as string,
            description: $("meta[property='og:description']").attr("content") as string,
            contents: $(".storyContent").text().replace(/[\t]/g, ""),
            image: "",
            creationTime: parseToTimestamp($(".HeaderNews_time__OB6JL").first().text().replace("입력 ", "")),
            media: $(".HeaderNews_link_press__Nx0pU img").attr("alt") as string,
            category: "",
          };

          newsItems.push(newsData);
          await page.close();

          // DB에 저장
          const collectionName = stockCollectionMap[key];
          const querySnapshot = await getDocs(
            collection(firestore, "news", "stockNews", "worldNews", collectionName, "articles"),
          );
          const existingNews = querySnapshot.docs.map((doc) => doc.data().headLine);

          if (!existingNews.includes(newsData.headLine)) {
            await saveDataToFirestore(newsItems, collectionName);
          } else {
            console.log(`News with headline "${newsData.headLine}" already exists in the database.`);
          }
        } catch (error) {
          console.error("Error : ", error);
        }
      }

      await browser.close();
    }
  } catch (error) {
    console.error("Error : ", error);
  }
};
