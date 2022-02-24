let poppeteer = require("puppeteer");
console.log("before");

let page;
let logingPage = "https://www.facebook.com/";
let phone = "8972068270";
let password = "adi1308@ALPU";
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
    let typeEmailpromise = page.type("input[id='email']", phone, {
      delay: 100,
    }); //type email
    return typeEmailpromise;
  })
  .then(() => {
    let typePasswordpromise = page.type("input[id='pass']", password, {
      delay: 100,
    }); //type password
    return typePasswordpromise;
  })
  .then(() => {
    let clickLoginPromise = page.click("button[name='login']");
  })
  .catch((err) => {
    console.log("error", err);
  });

console.log("After");
