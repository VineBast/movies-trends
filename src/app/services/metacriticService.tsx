import puppeteer from "puppeteer";
import { filterMoviesByDate, isLastThursdayPast } from "./dateService";

const getDataFromMetacritic = async () => {
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

export const getMoviesList = async () => {
    let data = await getDataFromMetacritic();
    console.log('data', data);
}
