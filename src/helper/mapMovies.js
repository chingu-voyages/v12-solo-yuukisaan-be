const mapMovies = movies => {
    return movies.map(movie => {
        const { poster_path, popularity, id, title, release_date , backdrop_path} = movie;
        return {
          poster: {
            backdrop: `http://image.tmdb.org/t/p/w185/${backdrop_path}`,
            poster: `http://image.tmdb.org/t/p/w185/${poster_path}`
          },
          likes: popularity,
          id,
          title,
          release_date
        };
      });
}

module.exports = mapMovies;