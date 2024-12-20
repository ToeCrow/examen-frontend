
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
        console.log(startpageTop10)
        
        updateImages();
    } catch (error) {
        console.error('Fel vid hämtning av filmer:', error);
    }
}

// Funktion för att uppdatera bilderna
function updateImages() {
    for (let i = 0; i < startpageTop10.length; i++) {
        const film = startpageTop10[i];
        const imageContainer = document.createElement('div'); // Container för bild och overlay
        imageContainer.classList.add('image-container'); // Klass för styling
        imageContainer.id = `top${i + 1}`

        // Skapa bild-element
        const image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/w500${film.backdrop_path}`;
        image.alt = film.title || "Film";

        // Skapa overlay-text
        const hoverText = document.createElement('div');
        hoverText.classList.add('hover-text'); // Klass för styling
        hoverText.textContent = `För att få mer info om "${film.title}", klicka här.`;

        // Lägg till bild och overlay-text i containern
        imageContainer.appendChild(image);
        imageContainer.appendChild(hoverText);

        // Byt ut befintlig bild med vår container
        const existingImage = document.getElementById(`top${i + 1}`);
        if (existingImage) {
            existingImage.replaceWith(imageContainer);
        }
    }
}


// Kör funktionen för att hämta filmer
getFilmsTop10();



