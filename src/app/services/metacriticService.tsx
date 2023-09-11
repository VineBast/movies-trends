import puppeteer from "puppeteer";
import { filterMoviesByDate } from "./dateService";

export const getMoviesList = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto("https://www.metacritic.com/browse/movies/release-date/theaters/date?view=condensed", {
        waitUntil: "domcontentloaded",
    });

    await page.waitForSelector('.details');
    let movies = await page.$$eval('.details', (elements) => {
        return elements.map((element) => {
            return { movie: element.querySelector('h3')?.textContent, releaseDate: element.querySelector('span')?.textContent };
        });
    });
    return (filterMoviesByDate(movies))
}
