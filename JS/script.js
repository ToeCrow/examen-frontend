
// OMDB API
// async function getFilms() {
//     try {
//         let page = 1;
//         let allResults = [];
//         let hasMore = true;

//         while (hasMore) {
//             const response = await fetch(`http://www.omdbapi.com/?s=batman&type=movie&page=${page}&plot=full&apikey=${apiKey2}`);
//             const data = await response.json();

//             if (data.Search) {
//                 allResults = allResults.concat(data.Search);
//                 page++;
//                 hasMore = page <= Math.ceil(data.totalResults / 10); // Stoppar när alla sidor är hämtade
//             } else {
//                 hasMore = false; // Stoppar vid fel
//             }
//         }

//         console.log(allResults);
//     } catch (error) {
//         console.error(error);
//     }
// }

// TMDB API
async function getFilms() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`);
        const data = await response.json();
        console.log(data);
        const filmContainer = document.querySelector('.film-container');
        filmContainer.innerHTML = '';
    
        data.results.forEach(film => {
            const filmElement = document.createElement('div');
            filmElement.classList.add('film');
            filmElement.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${film.backdrop_path}" alt="${film.title}">
                <h2>${film.title}</h2>
                <p>${film.overview}</p>
            `;
            filmContainer.appendChild(filmElement);
        });
    } catch (error) {
        console.error(error);
    }

    
    
    
    

}

getFilms();

// function showFilms(films) {
//     const filmContainer = document.querySelector('.film-container');
//     filmContainer.innerHTML = '';

//     films.forEach(film => {
//         const filmElement = document.createElement('div');
//         filmElement.classList.add('film');
//         filmElement.innerHTML = `
//             <img src="${film.poster_path}" alt="${film.title}">
//             <h2>${film.title}</h2>
//             <p>${film.overview}</p>
//         `;
//         filmContainer.appendChild(filmElement);
//     });
// }
