$(document).ready(() =>{
   $('#searchForm').on('submit', (e) => {
    e.preventDefault();
    let serchText = ($('#searchText').val())
    getMovies(serchText);
   })
});

function getMovies(searchText){
   axios.get("https://api.themoviedb.org/3/search/movie?api_key=f978469236288b7c33c1b9f16b70da07&language=en-US&query=" + searchText)
    .then(function(response){
    let movies =response.data.results;
    let output = '';
    $.each(movies, (index,movie) => {
        output+=` 
        <div class="col-md-3">
        <div class="well text-center">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
        <h5>${movie.title}</h5>
        <a onclick="movieSelected('${movie.id}')" class="btn btn-info" href="#">Movie Details</a>
        </div>
        </div>
        `;
    }); 
    $('#movies').html(output);
    })
    .catch((err) => {
       console.log(err);
    });
}
function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}
function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    axios.get("https://api.themoviedb.org/3/movie/" + movieId +"?api_key=f978469236288b7c33c1b9f16b70da07")
    .then(function(response){
        // console.log(response);
        let movie = response.data;

        let output =`
        <div class = 'row'>
         <div class="col-md-4">
         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
         </div>
         <div class="col-md-8">
         <h3>${movie.title}<h3>
         <ul class="list-group">
         <li class="list-group-item"><strong>Genre;</strong>${movie.genres[0].name}, ${movie.genres[1].name}</li>
         <li class="list-group-item"><strong>Released;</strong>${movie.release_date}</li>
         <li class="list-group-item"><strong>Rated;</strong>${movie.vote_average}</li>
         <li class="list-group-item"><strong>Runtime;</strong>${movie.runtime}</li>
         <li class="list-group-item"><strong>Production Companies:</strong> ${movie.production_companies[0].name} min.</li>
         </ul>
         </div>
        </div>
        <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${movie.overview}
          <hr>

          <a href="index.html" class="btn btn-success">Go Back To Search</a>
        </div>
      </div>
        `;

        $('#movie').html(output);
   
    })
    .catch((err) => {
       console.log(err);
    });
}
