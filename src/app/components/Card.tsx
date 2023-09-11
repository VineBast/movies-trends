import { getLetterboxdData } from "../services/letterboxdService";
import { getMoviesList } from "../services/metacriticService";

export const Card = async () => {
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