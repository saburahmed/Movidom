// For the slideshow
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}
// End of Slideshow

// For Search API
$(document).ready(() => {
  $(".form-inline").on("submit", e => {
    let searchText = $(".form-control").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios
    .get("http://www.omdbapi.com/?apikey=1a171d80&s=" + searchText)
    .then(response => {
      console.log(response);
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
              <div class="poster-container">
                  <img src="${movie.Poster}" class="movie-posters">
                  <p class="poppins title">${movie.Title}</p>
                  <a onclick="movieSelected('${
                    movie.imdbID
                  }')" class="btn poppins" href="#">Movie Details</a>
              </div>
          </div>
          `;
      });

      $("#movies").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
//   End of API search

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get("http://www.omdbapi.com/?apikey=1a171d80&i=" + movieId)
    .then(response => {
      console.log(response);
      let movie = response.data;

      let output = `
      <div class="info-section">
        <img src="${movie.Poster}" class="thumbnail">
        
        <div class="list-group">
          <h2>${movie.Title}</h2>          
          <ul>
            <li class="list-group-item"><strong>Genre:</strong> ${
              movie.Genre
            }</li>
            <li class="list-group-item"><strong>Released:</strong> ${
              movie.Released
            }</li>
            <li class="list-group-item"><strong>Rated:</strong> ${
              movie.Rated
            }</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${
              movie.imdbRating
            }</li>
            <li class="list-group-item"><strong>Director:</strong> ${
              movie.Director
            }</li>
            <li class="list-group-item"><strong>Writer:</strong> ${
              movie.Writer
            }</li>
            <li class="list-group-item"><strong>Actors:</strong> ${
              movie.Actors
            }</li>
          </ul>
          <div class="plot-buttons"
            <h3><strong>Plot:</strong></h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${
              movie.imdbID
            }" target="_blank" class="btn btn-primary">View iMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>        
        </div>    
      </div>
      `;

      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
