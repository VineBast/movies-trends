import { getMoviesList } from "../services/metacriticService"
import { getTmdbMovieByName } from "../services/tmdbService";

const imageUrl = 'https://image.tmdb.org/t/p/original';

export const getDataFromTmdb = async () => {
    let moviesList = await getMoviesList();
    let moviesData = [];

    const formatMovieName = (movieName: string) => {
        const firstSpaceIndex = movieName.indexOf(' ');

        if (firstSpaceIndex !== -1) {
            const newMovieName = movieName.substring(0, firstSpaceIndex) + movieName.substring(firstSpaceIndex + 1);
            return newMovieName;
        } else {
            return movieName;
        }
    }

    for (let i = 0; i < moviesList.length; i++) {
        let movie = await getTmdbMovieByName(formatMovieName(moviesList[i].movieName));
        let imageLink = imageUrl + movie?.poster_path;
        let voteCount = movie?.vote_count * 7;
        moviesData.push({ movieName: movie?.title, image: imageLink, tmdbId: movie?.id, likesCount: voteCount });
    }
    return moviesData;
}
