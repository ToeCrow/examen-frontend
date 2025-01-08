document.addEventListener('DOMContentLoaded', () => {

    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        favorite = JSON.parse(storedFavorites);
    }
    
    loadData();
    showStartPageMain();
});

let startpageTop10 = []; // Array för att spara topp 10 filmer
let best200Movies = [];  // Array för de 200 bästa filmerna
let genre = [];          // Array för filmgenrer
let favorite = [];       // Array for favoriter

async function loadData() {
    // Visa loading-skärmen innan async funktioner körs
    showLoading();

    // Vänta på att alla data har hämtats
    await Promise.all([
        getFilmsTop10(),
        best200ever(),
        getGenres() // Lägger till hämting av genrer här
    ]);

    // När alla asynkrona operationer är klara, dölja loading-skärmen
    hideLoading();
}

// Funktion för att hämta filmgenrer
async function getGenres() {
    try {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
        const response = await fetch(url);

        if (!response.ok) {
            handleApiError(response.status); // Anropa felhanteringsfunktionen om status är något annat än 200
            return;
        }

        const data = await response.json();
        genre = data.genres; // Spara filmgenrer i genre-arrayen
        console.log("Genres:", genre);
    } catch (error) {
        console.error('Fel vid hämtning av genrer:', error);
    }
}

// Funktion för att hämta filmer och lägga dem i startpageTop10
async function getFilmsTop10() {
    try {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1`;
        const response = await fetch(url);

        if (!response.ok) {
            handleApiError(response.status); // Anropa felhanteringsfunktionen om status är något annat än 200
            return;
        }

        const data = await response.json();
        startpageTop10 = data.results.slice(0, 10);
        console.log("startpageTop10: ", startpageTop10);
        updateImages();
    } catch (error) {
        console.error('Fel vid hämtning av filmer:', error);
    }
}

// Funktion för att hämta de 200 bästa filmerna
async function best200ever() {
    try {
        const pages = Array.from({ length: 10 }, (_, i) => i + 1);
        const fetchPromises = pages.map(page => {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&language=en-US&sort_by=vote_average.desc&without_genres=99&vote_count.gte=200&page=${page}`;
            return fetch(url).then(response => {
                if (!response.ok) {
                    handleApiError(response.status); // Anropa felhanteringsfunktionen om status är något annat än 200
                    throw new Error(`API request failed with status: ${response.status}`); // Stoppa vidare körning
                }
                return response.json(); // Annars, fortsätt med att hämta JSON
            });
        });

        const results = await Promise.all(fetchPromises);
        best200Movies = results.flatMap(data => data.results);
        console.log("best200Movies:", best200Movies);
        return best200Movies;
    } catch (error) {
        console.error('Fel vid hämtning av filmer:', error);
    }
}

// Funktion för att visa loading-skärmen
function showLoading() {
    document.getElementById('loading-screen').style.display = 'flex';
    document.getElementById('content').style.display = 'none';
}

// Funktion för att dölja loading-skärmen
function hideLoading() {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}

function showStartPageMain () {

    main.innerHTML = ""; // Töm main innan ny rendering
// Skapa och append `section` för top-4
const top4Section = document.createElement('section');
top4Section.id = 'top-4';

const top4Title = document.createElement('h2');
top4Title.id = 'top4-title';
top4Title.textContent = 'DE HETASTE FILMERNA JUST NU!';

const top1Img = document.createElement('img');
top1Img.src = '';
top1Img.alt = 'Film';
top1Img.id = 'top1';

const top24Div = document.createElement('div');
top24Div.id = 'top2-4';

for (let i = 2; i <= 4; i++) {
    const img = document.createElement('img');
    img.src = '';
    img.alt = 'Film';
    img.id = `top${i}`;
    top24Div.appendChild(img);
}
0
// Lägg till i top-4 section
top4Section.appendChild(top4Title);
top4Section.appendChild(top1Img);
top4Section.appendChild(top24Div);

// Append till main
main.appendChild(top4Section);

// Skapa och append `section` för social media
const socialMediaSection = document.createElement('section');
socialMediaSection.id = 'socialmedia';

const socialMediaWrapper = document.createElement('div');
socialMediaWrapper.id = 'socialmedia-wrapper';

const socialTitle = document.createElement('h2');
socialTitle.id = 'social-title';
socialTitle.textContent = 'FÖLJ OSS PÅ SOCIALA MEDIER';

const iconWrapper = document.createElement('div');
iconWrapper.id = 'icon-wrapper';

const socialMediaPlatforms = [
    { iconClass: 'fa-brands fa-instagram', name: 'Instagram' },
    { iconClass: 'fa-brands fa-tiktok', name: 'Tiktok' },
    { iconClass: 'fa-brands fa-facebook-f', name: 'Facebook' },
    { iconClass: 'fa-solid fa-m', name: 'Mynewsdesk' },
    { iconClass: 'fa-brands fa-linkedin-in', name: 'Linkedin' },
];

socialMediaPlatforms.forEach(platform => {
    const iconBox = document.createElement('div');
    iconBox.classList.add('icon-box');

    const iconCircle = document.createElement('div');
    iconCircle.classList.add('icon-cirkel');
    const icon = document.createElement('i');
    icon.className = platform.iconClass;
    icon.classList.add('custom-icon');

    iconCircle.appendChild(icon);
    iconBox.appendChild(iconCircle);

    const platformName = document.createElement('p');
    platformName.textContent = platform.name;
    iconBox.appendChild(platformName);

    iconWrapper.appendChild(iconBox);
});

// Lägg till i socialmedia section
socialMediaWrapper.appendChild(socialTitle);
socialMediaWrapper.appendChild(iconWrapper);
socialMediaSection.appendChild(socialMediaWrapper);
main.appendChild(socialMediaSection);

// Skapa och append `section` för top5-10
const top510Section = document.createElement('section');
top510Section.id = 'top5-10';

const top57Div = document.createElement('div');
top57Div.id = 'top5-7';

for (let i = 5; i <= 7; i++) {
    const img = document.createElement('img');
    img.src = '';
    img.alt = 'Film';
    img.id = `top${i}`;
    img.classList.add('film-img');
    top57Div.appendChild(img);
}

const top810Div = document.createElement('div');
top810Div.id = 'top8-10';

for (let i = 8; i <= 10; i++) {
    const img = document.createElement('img');
    img.src = '';
    img.alt = 'Film';
    img.id = `top${i}`;
    img.classList.add('film-img');
    top810Div.appendChild(img);
}

// Lägg till i top5-10 section
top510Section.appendChild(top57Div);
top510Section.appendChild(top810Div);
main.appendChild(top510Section);
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
        hoverText.textContent = `För att få mer info om "${film.title}", klicka på bilden.`;

        // Lägg till bild och overlay-text i containern med eventlistener
        imageContainer.appendChild(image);
        imageContainer.appendChild(hoverText);
        imageContainer.addEventListener('click', () => showMovieInfo(film));

        // Byt ut befintlig bild med vår container
        const existingImage = document.getElementById(`top${i + 1}`);
        if (existingImage) {
            existingImage.replaceWith(imageContainer);
        }
    }
}

// Funktion för att visa information i modal
function showMovieInfo(film) {
    // Hämta modal-elementet
    const modal = document.getElementById('modal');

    // Fyll modalen dynamiskt med information om filmen
    modal.innerHTML = `
        <div id="modal-wrap">
            <div id="movie-info">
                <h3>${film.title}</h3>
                <p id="movie-info-text">${film.overview || "Ingen beskrivning tillgänglig."}</p>
                <p id="movie-info-date">Releasedate: ${film.release_date || "N/A"}</p>
                <div id="favorite-button">
                    <i class="fa-regular fa-heart" id="favorite-toggle"></i>
                </div>
                <p id="modal-info">Klicka igen för att stänga</p>
            </div>
            <div id="movie-poster">
                <img src="https://image.tmdb.org/t/p/w300/${film.poster_path}" alt="${film.title}">
            </div>
        </div>
    `;

    const favoriteButton = document.getElementById('favorite-button');
    const favoriteToggle = document.getElementById('favorite-toggle');

    // Kontrollera om filmen redan är favorit
    const isFavorite = favorite.some(f => f.id === film.id);
    if (isFavorite) {
        favoriteToggle.classList.remove('fa-regular');
        favoriteToggle.classList.add('fa-solid');
        favoriteButton.classList.add('active'); // Lägg till active-state
    }

    // Lägg till klicklyssnare för att toggla favorit-status
    favoriteButton.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        toggleFavorite(film);
    });

    // Visa modalen
    modal.classList.remove('hidden');

    // Lägg till en klicklyssnare för att stänga modalen
    modal.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.innerHTML = ''; // Rensa innehållet för att förhindra duplicering
    }, { once: true }); // Se till att eventlisten tas bort efter en gång
}

const colors = ['#ffffff',, '#6BCABA', '#69B3E7', '#ffffff' ];
const randomColors = Array.from({ length: 10 }, () => colors[Math.floor(Math.random() * colors.length)]);

function updateBackgroundColors() {
    // Slumpa 3 färger för början och 3 för animationen
  
    // Uppdatera CSS-variablerna med de slumpmässiga färgerna
    document.documentElement.style.setProperty('--color1', randomColors[0]);
    document.documentElement.style.setProperty('--color2', randomColors[1]);
    document.documentElement.style.setProperty('--color3', randomColors[2]);
    document.documentElement.style.setProperty('--color4', randomColors[3]);
    document.documentElement.style.setProperty('--color5', randomColors[4]);
    document.documentElement.style.setProperty('--color6', randomColors[5]);
  }
  
  // Kör funktionen för att uppdatera bakgrundsfärgerna
  updateBackgroundColors();

const main = document.getElementById('main');
document.querySelector('nav').addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault(); 
        
        const href = event.target.getAttribute('href');
        handleNavigation(href);
    }
});

function handleNavigation(href) {
    switch (href) {
        case "#start":
            showStartPageMain ();
            updateImages();
            break;
        case "#200best":
            showBest200();
            break;
        case "#favorites":
            showFavorites();
            break;
        default:
            console.error("Okänd navigeringslänk");
    }
}

function showBest200() {
    main.innerHTML = ""; // Töm main innan ny rendering
    const sectionButtons = document.createElement('section');
    sectionButtons.id = "filterByGenre";
    sectionButtons.classList.add('scrollmenu');
    const sectionB200 = document.createElement('section');
    sectionB200.id = "b200";

    // Funktion för att filtrera filmer
    function filterMoviesByGenre(genreId) {
        const filteredMovies = best200Movies.filter(film => 
            film.genre_ids.includes(genreId)
        );
    
        const genreName = genre.find(g => g.id === genreId)?.name || "Okänd";
        categoryInfo.textContent = `Kategori: ${genreName} - ${filteredMovies.length} filmer hittades.`;
    
        displayMovies(filteredMovies);
    }
    

    const categoryInfo = document.createElement('h1');
    categoryInfo.id = "category-info";
    categoryInfo.textContent = "Visar alla 200 bästa filmer. Välj en kategori för att filtrera filmer.";
    main.appendChild(categoryInfo);


    const showAllButton = document.createElement('button');
    showAllButton.innerText = "Visa Alla";
    showAllButton.className = "filterButtons";
    showAllButton.addEventListener('click', () => {
    categoryInfo.textContent = "Visar alla 200 bästa filmer.";
    displayMovies(best200Movies);
    });
    sectionButtons.appendChild(showAllButton);



    // Rendera knappar för varje genre
    for (let i = 0; i < genre.length; i++) {
        const label = genre[i];

        const button = document.createElement('button');
        button.id = `button-${label.name}`;
        button.innerText = `${label.name}`;
        button.className = "filterButtons";
        button.addEventListener('click', () => filterMoviesByGenre(label.id));

        sectionButtons.appendChild(button);
    }

    // Funktion för att rendera filmer
    function displayMovies(movies) {
        sectionB200.innerHTML = ""; // Töm sektionen innan rendering

        for (let i = 0; i < movies.length; i++) {
            const film = movies[i];
            
            const container = document.createElement('div');
            container.className = "b200-container";
            container.addEventListener('click', () => showMovieInfo(film));

            // Slumpa en bakgrundsfärg från listan
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            container.style.backgroundColor = randomColor; // Tilldela den slumpmässiga färgen

            const title = document.createElement('h5');
            title.textContent = `${film.title}`;

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w300${film.poster_path}`;
            img.alt = film.title;

            const hoverText = document.createElement('div');
            hoverText.className = "b200-hovertext";
            hoverText.textContent = "Klicka för info";

            container.appendChild(title);
            container.appendChild(img);
            container.appendChild(hoverText);

            sectionB200.appendChild(container);
        }
    }

    // Visa alla filmer från början
    displayMovies(best200Movies);

    main.appendChild(sectionButtons);
    main.appendChild(sectionB200);
}

function showFavorites() {
    main.innerHTML = ""; // Töm main innan ny rendering
    const sectionButtons = document.createElement('section');
    sectionButtons.id = "filterByGenre";
    sectionButtons.classList.add('scrollmenu');
    const favorites = document.createElement('section');
    favorites.id = "favorites";

    // Funktion för att filtrera filmer
    function filterMoviesByGenre(genreId) {
        const filteredMovies = favorite.filter(film => 
            film.genre_ids.includes(genreId)
        );
    
        const genreName = genre.find(g => g.id === genreId)?.name || "Okänd";
        categoryInfo.textContent = `Kategori: ${genreName} - ${filteredMovies.length} filmer hittades.`;
    
        displayMovies(filteredMovies);
    }
    

    const categoryInfo = document.createElement('h1');
    categoryInfo.id = "category-info";
    categoryInfo.textContent = `Visar alla dina favoriter, ${favorite.length}st. Välj en kategori för att filtrera filmer.`;
    main.appendChild(categoryInfo);


    const showAllButton = document.createElement('button');
    showAllButton.innerText = "Visa Alla";
    showAllButton.className = "filterButtons";
    showAllButton.addEventListener('click', () => {
    categoryInfo.textContent = `Visar alla dina favoriter, ${favorite.length}st.`;
    displayMovies(favorite);
    });
    sectionButtons.appendChild(showAllButton);



    // Rendera knappar för varje genre
    for (let i = 0; i < genre.length; i++) {
        const label = genre[i];

        const button = document.createElement('button');
        button.id = `button-${label.name}`;
        button.innerText = `${label.name}`;
        button.className = "filterButtons";
        button.addEventListener('click', () => filterMoviesByGenre(label.id));

        sectionButtons.appendChild(button);
    }

    // Funktion för att rendera filmer
    function displayMovies(movies) {
        favorites.innerHTML = ""; // Töm sektionen innan rendering

        for (let i = 0; i < movies.length; i++) {
            const film = movies[i];
            
            const container = document.createElement('div');
            container.className = "b200-container";
            container.addEventListener('click', () => showMovieInfo(film));

            // Slumpa en bakgrundsfärg från listan
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            container.style.backgroundColor = randomColor; // Tilldela den slumpmässiga färgen

            const title = document.createElement('h5');
            title.textContent = `${i + 1} ${film.title}`;

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w300${film.poster_path}`;
            img.alt = film.title;

            const hoverText = document.createElement('div');
            hoverText.className = "b200-hovertext";
            hoverText.textContent = "Klicka för info";

            container.appendChild(title);
            container.appendChild(img);
            container.appendChild(hoverText);

            favorites.appendChild(container);
        }
    }

    // Visa alla filmer från början
    displayMovies(favorite);

    main.appendChild(sectionButtons);
    main.appendChild(favorites);
}

function toggleFavorite(film) {
    const index = favorite.findIndex(f => f.id === film.id);
    const favoriteToggle = document.getElementById('favorite-toggle');

    if (index === -1) {
        // Lägg till filmen i favoriter
        favorite.push(film);
        favoriteToggle.classList.remove('fa-regular');
        favoriteToggle.classList.add('fa-solid');
        document.getElementById('favorite-button').classList.add('active');
    } else {
        // Ta bort filmen från favoriter
        favorite.splice(index, 1);
        favoriteToggle.classList.remove('fa-solid');
        favoriteToggle.classList.add('fa-regular');
        document.getElementById('favorite-button').classList.remove('active');
    }
    console.log(favorite)

    // Uppdatera localStorage
    localStorage.setItem('favorites', JSON.stringify(favorite));
}

function handleApiError(statusCode) {
    switch (statusCode) {
        case 200:
            console.log("Allt gick bra! Dina data har hämtats framgångsrikt.");
            break;
        case 401:
            console.error("Oj! Det verkar som att du inte är inloggad eller att din API-nyckel är ogiltig. Dubbelkolla och försök igen.");
            break;
        case 403:
            console.error("Tyvärr, du har inte behörighet att komma åt den här resursen. Kontrollera dina rättigheter eller kontakta support.");
            break;
        case 404:
            console.error("Vi hittade inte det du letade efter. Kontrollera att adressen eller resursen är korrekt.");
            break;
        case 405:
            console.error("Metoden du försökte använda är inte tillåten för denna resurs. Kontrollera dokumentationen och försök igen.");
            break;
        case 422:
            console.error("Något stämmer inte med de uppgifter du skickade in. Kontrollera och försök igen.");
            break;
        case 500:
            console.error("Oj då! Något gick fel på servern. Försök igen senare, eller kontakta support om problemet kvarstår.");
            break;
        case 502:
            console.error("Det verkar som att det är problem att ansluta till servern. Försök igen om en stund.");
            break;
        case 503:
            console.error("Tjänsten är tillfälligt otillgänglig. Vi arbetar på att lösa problemet, försök igen senare.");
            break;
        case 504:
            console.error("Din begäran tog för lång tid. Kanske är det hög belastning just nu. Försök igen senare.");
            break;
        case 429:
            console.error("Oj, du har gjort för många förfrågningar på kort tid. Vänta lite och försök igen snart.");
            break;
        default:
            console.error("Något oväntat hände. Vi kunde inte hantera statuskoden:", statusCode);
    }
}
