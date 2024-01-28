const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjBhOWFkMjcyODkxYzc0OGRhM2NiNTIxY2ZmMzIwMiIsInN1YiI6IjY1MTQxYWViYTE5OWE2MDBlMWZhNDI4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RbXEXWu5Lvrzt94I-QI2XBp0SFGmNFTr8kwERPAgml0'
    }
};

export const getTmdbMovieByName = async (movieName: string) => {
    let response = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movieName + '&primary_release_year=2024&page=1', options);
    let movies = await response.json();
    if (movies.results[0] == undefined) {
        response = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movieName + '&primary_release_year=2023&page=1', options);
        movies = await response.json();
    }
    if (movies.results[0] == undefined) {
        response = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movieName + '&page=1', options);
        movies = await response.json();
    }
    if (movies.results[0] == undefined) {
        return { title: movieName }
    }
    return movies.results[0];
}
