
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

let startpageTop10 = []; // Array för att spara topp 10 filmer

// Funktion för att hämta filmer och lägga dem i startpageTop10
async function getFilmsTop10() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`);
        const data = await response.json();

        // Hämta endast de 10 första filmerna
        startpageTop10 = data.results.slice(0, 10);

        // startpageTop10.push(...top10Films);
        console.log(startpageTop10)
        // Kör funktionen som uppdaterar bilderna
        updateImages();
    } catch (error) {
        console.error('Fel vid hämtning av filmer:', error);
    }
}

// Funktion för att uppdatera bilderna
function updateImages() {
    for (let i = 0; i < startpageTop10.length; i++) {
        const film = startpageTop10[i]; 
        const image = document.getElementById(`top${i + 1}`);
        image.src = `https://image.tmdb.org/t/p/w500${film.backdrop_path}`; 
        image.alt = film.title || "Film"; 
    }
}

// Kör funktionen för att hämta filmer
getFilmsTop10();



