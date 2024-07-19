import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

import { firestore } from "@/firebase/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NewsResponse } from "@/types/news";
import { uuid } from "uuidv4";
import { setImprovedCrawlerPerformance } from "./setImprovedCrawlerPerformance";
import parseToTimestamp from "./parseToTimestmp";

export const getRecentNews = async () => {
  const browser = await puppeteer.launch(); // 브라우저 실행
  const page = await browser.newPage(); // 새로운 페이지 열기
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  setImprovedCrawlerPerformance();

  try {
    const targetURL = "https://m.stock.naver.com/investment/news/flashnews";

    // 지정된 URL 접속
    await page.goto(targetURL);

    // API를 이용해 기사 URL에 들어갈 data 가져오기
    try {
      const response = await fetch(
        "https://m.stock.naver.com/front-api/news/category?category=flashnews&pageSize=60&page=1",
      );

      const data = await response.json();
      let results = [...data.result];

      let urls = [];

      for (let result of results) {
        let url = `https://n.news.naver.com/article/${result.officeId}/${result.articleId}`;
        urls.push(url);
      }

      for (let url of urls) {
        try {
          await page.goto(url);

          const html = await page.content();
          const $ = cheerio.load(html);

          const newsData: NewsResponse = {
            newsId: uuid(),
            relatedStocks: "",
            headLine: $("h2#title_area span").text(),
            description: $("meta[property='og:description']").attr("content") as string,
            contents: $("._article_content").text().replace(/[\t]/g, ""),
            image: $("meta[property='og:image']").attr("content") as string,
            creationTime: parseToTimestamp($("._ARTICLE_DATE_TIME").text()),
            media: $(".media_end_head_top_logo img").attr("title") as string,
            category: $(".media_end_categorize_item:first-child").text(),
          };

          const querySnapshot = await getDocs(collection(firestore, "news", "recentNews", "articles"));
          const existingNews = querySnapshot.docs.map((doc) => doc.data().headLine);

          if (!existingNews.includes(newsData.headLine)) {
            const recentRef = collection(firestore, "news", "recentNews", "articles");
            await addDoc(recentRef, newsData);
          } else {
            return;
          }
        } catch (error) {
          console.error("Error : ", error);
        }
      }
    } catch (error) {
      console.error("Error while collecting URLs:", error);
    }
  } catch (error) {
    console.error("Error : ", error);
  } finally {
    await page.close();
    await browser.close();
  }
};
