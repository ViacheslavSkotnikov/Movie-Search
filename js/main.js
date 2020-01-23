document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("searchForm").addEventListener("submit", e => {
    let searchText = document.getElementById("searchText").value;
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios
    .get("http://www.omdbapi.com?s=" + searchText + "&apikey=d7bffbfb")
    .then(response => {
      console.log(response);
      let movies = response.data.Search;
      let output = "";
      movies.forEach(function(movie, index) {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Подробно</a>
            </div>
          </div>
        `;
      });

      document.getElementById("movies").innerHTML = output;
    })
    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get("http://www.omdbapi.com?i=" + movieId + "&apikey=d7bffbfb")
    .then(response => {
      console.log(response);
      let movie = response.data;

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Жанр:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Дата выхода:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Возрастной рейтинг:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB рейтинг:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Режиссер:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Сценарист:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Актеры:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Сюжет</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Открыть IMDB</a>
            <a href="index.html" class="btn btn-default">Обратно к поиску</a>
          </div>
        </div>
      `;

      document.getElementById("movie").innerHTML = output;
    })
    .catch(err => {
      console.log(err);
    });
}
