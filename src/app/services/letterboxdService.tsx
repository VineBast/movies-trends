import puppeteer from 'puppeteer';

function extractHTMLCount(elementHTML: string) {
    const match = elementHTML.match(/by (\d+(?:,\d+)*)/);
    if (match && match[1]) {
      const count = parseInt(match[1].replace(/,/g, ''), 10);
      return count;
    }
    return null;
  }

export const getLetterboxdData = async (movieName: string) => {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });
  
    let url = "https://letterboxd.com/film/" + movieName + "";
  
    const page = await browser.newPage();
  
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });
  
    await page.waitForSelector('.filmstat-watches');
    let watchesHTML = await page.$eval('.icon-liked', (element) => {
      return element.outerHTML;
    });
  
    await page.waitForSelector('.filmstat-likes');
    let likesHTML = await page.$eval('.icon-liked', (element) => {
      return element.outerHTML;
    });
  
    await page.close();
    await browser.close();
  
  
    //console.log('text', likesHTML);
    let watchesCount = extractHTMLCount(watchesHTML);
    let likesCount = extractHTMLCount(likesHTML);
  
    //console.log('count', likesCount);
  
  
    return { likesCount, watchesCount };
  
  
  
    // Display the quotes
    //console.log(quotes);
  };