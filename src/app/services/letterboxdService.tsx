import puppeteer, { Page } from 'puppeteer';

function extractHTMLCount(elementHTML: string) {
  const match = elementHTML.match(/by (\d+(?:,\d+)*)/);
  if (match && match[1]) {
    const count = parseInt(match[1].replace(/,/g, ''), 10);
    return count;
  }
  return null;
}

function tranformMovieName(movieName: string) {
  console.log('movieName:', movieName);
  const replacedString = movieName.trim().toLowerCase().replace(/ *\([^)]*\) */g, '').replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-').replace(/-+/g, '-');
  return replacedString;
}

const getTrend = async (movieName: string, page: Page) => {

  let transformedMovieName = tranformMovieName(movieName);

  console.log('nom transfo: ', transformedMovieName);

  let url = "https://letterboxd.com/film/" + transformedMovieName + "";

  /* const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  }); */

  //const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  let watchesHTML = '';
  try {
    await page.waitForSelector('.filmstat-watches');
    watchesHTML = await page.$eval('.icon-watched', (element: { outerHTML: any; }) => {
      return element.outerHTML;
    });
  } catch (e) {
    return '';
  }
  let likesHTML = '';
  try {
    await page.waitForSelector('.filmstat-likes');
    likesHTML = await page.$eval('.icon-liked', (element: { outerHTML: any; }) => {
      return element.outerHTML;
    });
  } catch (e) {
    return '';
  }

  //await page.close();

  let watchesCount = extractHTMLCount(watchesHTML);
  let likesCount = extractHTMLCount(likesHTML);

  return { movieName, likesCount, watchesCount };
}

export const getLetterboxdData = async (moviesList: any) => {
  //console.log('moviesList: ', moviesList);

  let moviesListTrends = [];
  //console.log("movieslist", moviesList)
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  for (let i = 0; i < moviesList.length; i++) {
    //moviesListTrends.push(await getTrend(moviesList[i].movieName))
    let dataFromLetterboxd = await getTrend(moviesList[i].movieName, page);
    //console.log('dataFromLetterboxd', dataFromLetterboxd)
    if (dataFromLetterboxd.likesCount === Number) {
      dataFromLetterboxd.likesCount = moviesList[i].likesCount + dataFromLetterboxd.likesCount;
    }
    moviesListTrends.push(Object.assign(moviesList[i], dataFromLetterboxd));
    console.log('moviesList: ', moviesListTrends[i]);
  }
  console.log("data: ", moviesList);
  return moviesListTrends;
};