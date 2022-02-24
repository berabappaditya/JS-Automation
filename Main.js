let poppeteer = require("puppeteer");
console.log("before");

let page;
let logingPage = "https://www.hackerrank.com/auth/login";
let email = "cogob53425@bepureme.com";
let password = "Bera@1998";
let browserWilllbelunchPromise = poppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});
browserWilllbelunchPromise
  .then(function (browserInstance) {
    let newTabPromise = browserInstance.newPage();
    return newTabPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let pagewillbeOpenPromise = page.goto(logingPage); //go to HackerRank
    return pagewillbeOpenPromise;
  })
  .then(function (webpage) {
    let typeEmailpromise = page.type("input[id='input-1']", email, {
      delay: 100,
    }); //type email
    return typeEmailpromise;
  })
  .then(() => {
    let typePasswordpromise = page.type("input[id='input-2']", password, {
      delay: 100,
    }); //type password
    return typePasswordpromise;
  })
  .then(() => {
    let clickLoginPromise = page.click(
      "button[data-analytics='LoginPassword']",
      {
        delay: 100,
      }
    );
    return clickLoginPromise;
  })
  .then(() => {
    let algoWillBeClickedPromise = waitAndClick(
      '.topic-card a[data-attr1="algorithms"]',
      page
    );
    return algoWillBeClickedPromise;
  })
  .then(() => {
    let gotoWarmupPromise = waitAndClick(
      '.checkbox-wrap input[value="warmup"]',
      page
    );
    return gotoWarmupPromise;
  })
  .then(() => {
    let challengeArr = page.$$(
      "ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled",
      { delay: 100 }
    );
    return challengeArr;
  })
  .then((questionsArr) => {
    console.log(`Nomber of loaded question: ${questionsArr.length}`);
  })
  .catch((err) => {
    console.log("error", err);
  });

function waitAndClick(selector, cPage) {
  return new Promise((resolve, reject) => {
    let waitForModalPromise = cPage.waitForSelector(selector);
    waitForModalPromise
      .then(() => {
        let clickModalPromise = cPage.click(selector, { delay: 100 });
        return clickModalPromise;
      })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
}
