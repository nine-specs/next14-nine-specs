import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

import { firestore } from "@/firebase/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NewsResponse } from "@/types/news";
import { uuid } from "uuidv4";
import { setImprovedCrawlerPerformance } from "./setImprovedCrawlerPerformance";
import parseToTimestamp from "../parseToTimestmp";

const stockList = {
  애플: "AAPL",
  아마존: "AMZN",
  테슬라: "TSLA",
  마이크로소프트: "MSFT",
  구글: "GOOGL",
  유니티: "U",
  고프로: "GPRO",
  로빈후드: "HOOD",
  브로드컴: "AVGO",
  엔비디아: "NVDA",
  카사바사이언스: "SAVA",
  코닥: "KODK",
  펠로튼: "PTON",
};

export const getRecentNews = async () => {
  const browser = await puppeteer.launch(); // 브라우저 실행
  const page = await browser.newPage(); // 새로운 페이지 열기
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  setImprovedCrawlerPerformance(page);

  try {
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

          let contents = $("._article_content").text();

          // 관련 종목 설정
          let relatedStocks = [];
          for (const [key, value] of Object.entries(stockList)) {
            if (contents.includes(key)) {
              relatedStocks.push(value);
            }
          }

          const newsData: NewsResponse = {
            newsId: uuid(),
            relatedStocks: relatedStocks || "",
            headLine: $("h2#title_area span").text(),
            description: $("meta[property='og:description']").attr("content") as string,
            contents: contents.replace(/[\t]/g, ""),
            image: $("meta[property='og:image']").attr("content") as string,
            creationTime: parseToTimestamp($("._ARTICLE_DATE_TIME").text()),
            media: $(".media_end_head_top_logo img").attr("title") as string,
            category: $(".media_end_categorize_item:first-child").text(),
          };

          // 중복 검사 후 DB에 저장
          const querySnapshot = await getDocs(collection(firestore, "news", "recentNews", "articles"));
          const existingNews = querySnapshot.docs.map((doc) => doc.data().headLine);

          if (!existingNews.includes(newsData.headLine)) {
            const recentRef = collection(firestore, "news", "recentNews", "articles");
            await addDoc(recentRef, newsData);
            console.log("DB에 저장됨");
          } else {
            continue;
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
