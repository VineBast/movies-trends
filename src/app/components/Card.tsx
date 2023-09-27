import { getLetterboxdData } from "../services/letterboxdService";
import { getMoviesList } from "../services/metacriticService";

/* import got from 'got';
import { JSDOM } from "jsdom";

const scrapeData = async () => {
    got("https://letterboxd.com/film/barbie")
        .then(async (response) => {
            const dom = new JSDOM(response.body);
            console.log(dom?.window.document.body.querySelector('.content-wrap')?.querySelector('#film-page-wrapper')?.querySelector('#js-poster-col')?.querySelector('.poster-list')?.querySelector('.film-stats')?.querySelector('.filmstat-watches'))
            return dom;
        })
        .then(async (response) => {
            //console.log(response)
        })
        .catch((err) => {
            console.log(err);
        });
} */

const readData = () => {

}

export const Card = async () => {
    //let test = scrapeData();
        const data = getLetterboxdData(await getMoviesList());
    
        return (
            <div>
            <ol>
              {(await data).map((movie) => (
                <li key={movie.movieName}>{movie.movieName} : {movie.likesCount},  {movie.watchesCount}</li>
              ))}
            </ol>
          </div>
        )

}