const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjBhOWFkMjcyODkxYzc0OGRhM2NiNTIxY2ZmMzIwMiIsInN1YiI6IjY1MTQxYWViYTE5OWE2MDBlMWZhNDI4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RbXEXWu5Lvrzt94I-QI2XBp0SFGmNFTr8kwERPAgml0'
    }
};

export const getTmdbMovieByName = async (movieName: string) => {
    const response = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movieName + '&include_adult=false&primary_release_year=2023&page=1', options);
    const movies = await response.json();
    //const data = JSON.stringify(movies);
    console.log('data: ', movies)
    if (movies.results[0] == undefined) {
        return { title: movieName }
    }
    return movies.results[0];
}
