import puppeteer from "puppeteer";

export const setImprovedCrawlerPerformance = async (page: any) => {
  // 로딩 시간을 줄이기 위해 리소스 막기
  const blockResources = ["image", "script", "stylesheet", "xhr", "font", "other"];

  await page.setRequestInterception(true);

  page.on("request", (req: any) => {
    // 리소스 유형
    const resource = req.resourceType();
    if (blockResources.indexOf(resource) !== -1) {
      req.abort(); // 리소스 막기
    } else {
      req.continue(); // 리소스 허용하기
    }
  });

  // dialog 발생 시 강제 종료
  page.on("dialog", async (dialog: any) => {
    await dialog.dismiss();
  });
};
