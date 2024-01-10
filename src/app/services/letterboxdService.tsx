import puppeteer, { Page } from 'puppeteer';
import submitData from './prismaClient';
import { getLastThursday } from '../utils/dateService';

function extractHTMLCount(elementHTML: string) {
  const match = elementHTML.match(/by (\d+(?:,\d+)*)/);
  if (match && match[1]) {
    const count = parseInt(match[1].replace(/,/g, ''), 10);
    return count;
  }
  return null;
}

function tranformMovieName(movieName: string) {
  const replacedString = movieName.trim().toLowerCase().replace(/ *\([^)]*\) */g, '').replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-').replace(/-+/g, '-');
  return replacedString;
}

const getTrend = async (movieName: string, page: Page) => {

  let transformedMovieName = tranformMovieName(movieName);
  let url = "https://letterboxd.com/film/" + transformedMovieName + "";

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

  let watchesCount = extractHTMLCount(watchesHTML);
  let likesCount = extractHTMLCount(likesHTML);

  return { movieName, likesCount, watchesCount };
}

export const getLetterboxdData = async (moviesList: any) => {
  let moviesListTrends = [];
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  for (let i = 0; i < moviesList.length; i++) {
    let dataFromLetterboxd: any = await getTrend(moviesList[i].movieName, page);

    if (dataFromLetterboxd?.likesCount === Number) {
      dataFromLetterboxd.likesCount = moviesList[i].likesCount + dataFromLetterboxd.likesCount;
    }
    moviesListTrends.push(Object.assign(moviesList[i], dataFromLetterboxd));
  }
  moviesListTrends.forEach((movie) => {
    submitData(movie, getLastThursday().toJSON().slice(0,10));
  })
  return moviesListTrends;
};