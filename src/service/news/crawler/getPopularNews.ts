import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

import { firestore } from "@/firebase/firebaseConfig";
import { ref, onChildAdded } from "firebase/database";
import { addDoc, collection, getDocs } from "firebase/firestore";

import { NewsResponse } from "@/types/news";
import { uuid } from "uuidv4";
import { setImprovedCrawlerPerformance } from "./setImprovedCrawlerPerformance";
import parseToTimestamp from "./parseToTimestmp";

type KeywordsType = {
  [key: string]: string;
};

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
      const url = await link.$eval("a", (element: any) => element.getAttribute("href"));
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
          contents: $("._article_content").text(),
          image: $("meta[property='og:image']").attr("content") as string,
          creationTime: parseToTimestamp($("._ARTICLE_DATE_TIME").text()),
          media: $(".media_end_head_top_logo img").attr("title") as string,
          category: $(".media_end_categorize_item").text(),
        };

        // // 중복 확인 후 newsData를 DB에 저장
        // const querySnapshot = await getDocs(collection(firestore, "news", "popularNews", "articles"));

        // const existingNews = querySnapshot.docs.map((doc) => doc.data().headLine);

        const popularRef = collection(firestore, "news", "popularNews", "articles");

        // if (!existingNews.includes(newsData.headLine)) {
        //   await addDoc(popularRef, newsData);
        // } else {
        //   return;
        // }

        const keywords: KeywordsType = {
          애플: "AAPL",
          테슬라: "TSLA",
          구글: "GOOGL",
          마이크로소프트: "MSFT",
          유니티: "U",
          아마존: "AMZN",
        };

        // onChildAdded(popularRef, (snapshot) => {
        //   const article = snapshot.val();
        //   const headline = article.headline;

        //   // 키워드 배열을 순회하며 헤드라인에 키워드가 포함되어 있는지 확인
        //   let relatedStock = null;
        //   for (const keyword in keywords) {
        //     if (keywords.hasOwnProperty(keyword) && headline.includes(keyword)) {
        //       relatedStock = keywords[keyword];
        //       break;
        //     }
        //   }
        //   newsData.relatedStocks = relatedStock as string;
        //   console.log(newsData);
        // });
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
