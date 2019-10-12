const mapMovies = movies => {
    return movies.map(movie => {
        const { poster_path, popularity, id, title, release_date } = movie;
        return {
          poster: {
            desktop: `http://image.tmdb.org/t/p/w342/${poster_path}`,
            mobile: `http://image.tmdb.org/t/p/w185/${poster_path}`
          },
          likes: popularity,
          id,
          title,
          release_date
        };
      });
}

module.exports = mapMovies;