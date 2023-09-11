import puppeteer from 'puppeteer';

function extractHTMLCount(elementHTML: string) {
  const match = elementHTML.match(/by (\d+(?:,\d+)*)/);
  if (match && match[1]) {
    const count = parseInt(match[1].replace(/,/g, ''), 10);
    return count;
  }
  return null;
}

function tranformMovieName(movieName: string) {
  const replacedString = movieName.replace(/[^\w\s]/g, '').replace(/ /g, '-').toLocaleLowerCase();
  return replacedString;
}

const getTrend = async (movieName: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  let transformedMovieName = tranformMovieName(movieName);

  let url = "https://letterboxd.com/film/" + transformedMovieName + "";

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector('.filmstat-watches');
  let watchesHTML = await page.$eval('.icon-watched', (element) => {
    return element.outerHTML;
  });

  await page.waitForSelector('.filmstat-likes');
  let likesHTML = await page.$eval('.icon-liked', (element) => {
    return element.outerHTML;
  });

  await page.close();
  await browser.close();

  let watchesCount = extractHTMLCount(watchesHTML);
  let likesCount = extractHTMLCount(likesHTML);

  return { movieName, likesCount, watchesCount };
}

export const getLetterboxdData = async (moviesList: any) => {
  let moviesListTrends = [];
  //console.log("movieslist", moviesList)
  for (let i = 0; i < moviesList.length; i++) {
    moviesListTrends.push(await getTrend(moviesList[i].movie))
  }
  console.log("data: ", moviesListTrends);
  return moviesListTrends;
};