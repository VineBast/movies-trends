import puppeteer from "puppeteer";
import { filterMoviesByDate } from "./dateService";

export const getMoviesList = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto("https://www.metacritic.com/browse/movie/all/all/all-time/new/?releaseType=in-theaters&releaseYearMin=1910&releaseYearMax=2023&page=1", {
        waitUntil: "domcontentloaded",
    });

    await page.waitForSelector('.c-finderProductCard');
    let movies = await page.$$eval('.c-finderProductCard', (elements) => {
        return elements.map((element) => {
            return { movie: element.querySelector('h3')?.textContent, releaseDate: element.querySelectorAll('span')[1]?.textContent };
        });
    });
    console.log("movies: ", movies);
    return (filterMoviesByDate(movies))
}
