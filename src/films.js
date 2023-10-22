const movies = require('./data');

// Exercise 1: Get the array of all directors.
function getAllDirectors(array) {
  let movieDirectors = array.map((movie) => movie.director);
  console.log('EXERCICE 1 ->', movieDirectors);
  return movieDirectors;
}

// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(array, director) {
  let directorMovies = array.filter((movie) => movie.director === director);
  console.log('EXERCICE 2 ->', directorMovies);
  return directorMovies;
}

// Exercise 3: Calculate the average of the films of a given director.
function moviesAverageOfDirector(array, director) {
  let directorMovies = getMoviesFromDirector(array, director);

  if (directorMovies.length === 0) {
    return null;
  }
  // Calculating the average score of the director's movies
  let averageMovie =
    directorMovies.reduce((total, movie) => total + movie.score, 0) /
    directorMovies.length;

  console.log('EXERCICE 3 ->', averageMovie);
  return Number(averageMovie.toFixed(2));
}

// Exercise 4:  Alphabetic order by title
function orderAlphabetically(array) {
  let movieAlphaSorted = array
    .map((movie) => movie.title)
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 20);

  console.log('EXERCICE 4 ->', movieAlphaSorted);

  return movieAlphaSorted;
}

// Exercise 5: Order by year, ascending
function orderByYear(array) {
  let filmsByYear = array
    .filter((movie) => movie.year)

    // Sort the movies first by year, and then by title for the same year
    .sort((a, b) => {
      if (a.year === b.year) {
        return a.title.localeCompare(b.title);
      }
      return a.year - b.year;
    });

  return filmsByYear;
}

// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory(array, genre, index) {
  // Filter movis by the genre and index since genre is an array
  let moviesByGenre = array.filter((movie) => {
    return movie.genre[index] === genre[index];
  });

  if (moviesByGenre.length === 0) {
    return null;
  }

  // Calculate the average score of movies in one genre
  let averageMovieByGenre =
    moviesByGenre.reduce((total, movie) => total + movie.score, 0) /
    moviesByGenre.length;
  return Number(averageMovieByGenre.toFixed(2));
}

// Exercise 7: Modify the duration of movies to minutes
function hoursToMinutes(array) {
  const minutesArray = array.map((movie) => {
    // Use regex to get an array of hours, tens of minutes, and minutes
    const match = movie.duration.match(/[0-9]/g);

    if (match && match.length === 3) {
      // Extract hours, tens of minutes, and minutes
      const hours = parseInt(match[0]);
      const minutesTen = parseInt(match[1]);
      const minutes = parseInt(match[2]);

      const toMinutes = hours * 60 + minutesTen * 10 + minutes;

      // Return a new movie object with the duration in minutes
      return { ...movie, duration: toMinutes };
    }

    if (match && match.length === 1) {
      // Extract hours if the movie duration has no minutes, only hours (like duration: "2h")
      const hours = parseInt(match[0]);

      const toMinutes = hours * 60;
      return { ...movie, duration: toMinutes };
    }
  });

  return minutesArray;
}

// Exercise 8: Get the best film of a year
function bestFilmOfYear(array) {
  // array for the best movies of each year. with Set no duplicates
  let movieByYear = Array.from(new Set(array.map((movie) => movie.year)));
  // best movie for each year
  let bestMovieByYear = movieByYear.map((year) => {
    const bestByYear = array
      .filter((movie) => movie.year === year)
      .sort((a, b) => b.score - a.score);
    return bestByYear[0]; // The movie with the highest score for that year is in index 0
  });
  return bestMovieByYear;
}
// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getMoviesFromDirector,
    moviesAverageOfDirector,
    orderAlphabetically,
    orderByYear,
    moviesAverageByCategory,
    hoursToMinutes,
    bestFilmOfYear
  };
}
