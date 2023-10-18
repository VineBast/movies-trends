import { getMoviesList } from "../services/metacriticService"
import { getTmdbMovieByName } from "../services/tmdbService";

const imageUrl = 'https://image.tmdb.org/t/p/original';

const formatData = async () => {
    let movies = await getDataFromTmdb();

}

export const getDataFromTmdb = async () => {
    let moviesList = await getMoviesList();
    let moviesData = [];

    for (let i = 0; i < moviesList.length; i++) {
        let movie = await getTmdbMovieByName(moviesList[i].movieName);
        //console.log('movie: ', movie);
        if (movie.poster_path == undefined) {
            console.log('undef')
        }
        //movie.poster_path == undefined ? imageLink = 'https://pedagogie.ac-rennes.fr/sites/pedagogie.ac-rennes.fr/local/cache-vignettes/L450xH377/andreykuzmin140400103imagelibrecinema-cb20c.jpg?1680692571' : imageLink = movie.poster_path;
        let imageLink = imageUrl + movie?.poster_path;
        moviesData.push({ movieName: movie?.title, image: imageLink, tmdbId: movie?.id, likesCount: movie?.vote_count });
        console.log("moviesData: ", moviesData[i].image)
    }

    //console.log('moviesData', moviesData);

    return moviesData;
}
