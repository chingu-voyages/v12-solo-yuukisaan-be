const mapMovies = movies => {
    return movies.map(movie => {
        const { poster_path, popularity, id, title, release_date , backdrop_path, overview} = movie;
        return {
          poster: {
            backdrop: `http://image.tmdb.org/t/p/original/${backdrop_path}`,
            poster: `http://image.tmdb.org/t/p/w92/${poster_path}`
          },
          likes: popularity,
          id,
          title,
          release_date,
          overview
        };
      });
}

module.exports = mapMovies;