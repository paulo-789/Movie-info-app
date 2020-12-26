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
        <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
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
