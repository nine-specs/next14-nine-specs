import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

import { firestore } from "@/firebase/firebaseConfig";
import { addDoc, collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { NewsResponse } from "@/types/news";
import { uuid } from "uuidv4";
import { setImprovedCrawlerPerformance } from "./setImprovedCrawlerPerformance";
import parseToTimestamp from "../parseToTimestmp";

const stockList = {
  AAPL: "AAPL.O",
  AMZN: "AMZN.O",
  TSLA: "TSLA.O",
  MSFT: "MSFT.O",
  GOOGL: "GOOGL.O",
  U: "U",
};

export const getStockNews = async () => {
  setImprovedCrawlerPerformance();

  try {
    const items: any[] = [];
    for (const [key, value] of Object.entries(stockList)) {
      const response = await fetch(`https://api.stock.naver.com/news/stock/${value}?pageSize=30&page=1`);
      const data = await response.json();

      console.log(data);

      if (data.items) {
        items.push(...data.items);
      }
      console.log(items);

      //   let urls = [];

      //   for (let item of items) {
      //     let url = `https://n.news.naver.com/article/${item.officeId}/${item.articleId}`;
      //     urls.push(url);
      //   }

      //   console.log(urls);

      // for (let url of urls) {
      //   try {
      //     const browser = await puppeteer.launch(); // 브라우저 실행
      //     const page = await browser.newPage(); // 새로운 페이지 열기
      //     await page.setViewport({
      //       width: 1920,
      //       height: 1080,
      //     });
      //     await page.goto(url);

      //     const html = await page.content();
      //     const $ = cheerio.load(html);

      //     const newsData: NewsResponse = {
      //       newsId: uuid(),
      //       relatedStocks: key,
      //       headLine: $("meta[property='og:title']").attr("content") as string,
      //       description: $("meta[property='og:description']").attr("content") as string,
      //       contents: $(".storyContent").text().replace(/[\t]/g, ""),
      //       image: "",
      //       creationTime: parseToTimestamp($(".HeaderNews_time__OB6JL").first().text().replace("입력 ", "")),
      //       media: $(".HeaderNews_link_press__Nx0pU img").attr("alt") as string,
      //       category: "",
      //     };

      //     await page.close();
      //     await browser.close();

      // DB에 저장
      // const querySnapshot = await getDocs(collection(firestore, "news", "stockNews", "articles"));
      // const existingNews = querySnapshot.docs.map((doc) => doc.data().headLine);

      // if (!existingNews.includes(newsData.headLine)) {
      //   const stockRef = collection(firestore, "news", "stockNews", "articles");

      //   await addDoc(stockRef, newsData);
      // } else {
      //   return;
      // }
      //   } catch (error) {
      //     console.error("Error : ", error);
      //   }
      // }
    }
  } catch (error) {
    console.error("Error : ", error);
  }
};
