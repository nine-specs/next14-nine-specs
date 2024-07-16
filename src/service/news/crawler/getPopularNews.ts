import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

import { firestore } from "@/firebase/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NewsResponse } from "@/types/news";
import { v4 as uuidv4 } from "uuid";
import { setImprovedCrawlerPerformance } from "./setImprovedCrawlerPerformance";

export const getPopularNews = async () => {
  const browser = await puppeteer.launch(); // 브라우저 실행
  const page = await browser.newPage(); // 새로운 페이지 열기
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  setImprovedCrawlerPerformance();

  try {
    const targetURL = "https://m.stock.naver.com/investment/news/ranknews";

    // 지정된 URL 접속
    await page.goto(targetURL);

    const links = await page.$$("ul.list > li");

    let urls = [];
    for (let link of links) {
      const url = await link.$eval("a", (element: any) =>
        element.getAttribute("href"),
      );
      urls.push(url);
    }

    for (let url of urls) {
      try {
        await page.goto(url);

        const html = await page.content();
        const $ = cheerio.load(html);

        const newsData: NewsResponse = {
          newsId: uuidv4(),
          relatedStocks: "",
          headLine: $("h2#title_area span").text(),
          description: $("meta[property='og:description']").attr(
            "content",
          ) as string,
          contents: $("._article_content").text(),
          image: $("meta[property='og:image']").attr("content") as string,
          creationTime: $("._ARTICLE_DATE_TIME").text(),
          media: $(".media_end_head_top_logo img").attr("title") as string,
          category: $(".media_end_categorize_item").text(),
        };

        // newsData를 중복 확인 후 DB에 저장
        const querySnapshot = await getDocs(
          collection(firestore, "news", "populaeNews", "articles"),
        );
        const existingNews = querySnapshot.docs.map(
          (doc) => doc.data().headLine,
        );

        if (!existingNews.includes(newsData.headLine)) {
          const popularRef = collection(
            firestore,
            "news",
            "popularNews",
            "articles",
          );
          await addDoc(popularRef, newsData);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  } catch (error) {
    console.error("Error : ", error);
  } finally {
    await page.close();
    await browser.close();
  }
};
