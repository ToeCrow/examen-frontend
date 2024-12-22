document.addEventListener('DOMContentLoaded', () => {
    showStartPageMain();
    getFilmsTop10();
    best200ever();
});

const colors = ['#ffffff','#ffffff','#FC6719', '#6BCABA', '#69B3E7', '#ffffff', '#FF5572', '#FFCB14', '#ffffff', '#ffffff'];
const randomColors = Array.from({ length: 10 }, () => colors[Math.floor(Math.random() * colors.length)]);

function updateBackgroundColors() {
    // Slumpa 3 färger för början och 3 för animationen
    const randomColors = Array.from({ length: 6 }, () => colors[Math.floor(Math.random() * colors.length)]);
  
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
            console.log("Start-sidan laddas...");
            // Kör kod för att ladda startsidan
            break;
        case "#200best":
            showBest200() 
            break;
        case "#om":
            console.log("Om sidan visas...");
            // Kör kod för att visa information om sidan
            break;
        default:
            console.error("Okänd navigeringslänk");
    }
}


function showStartPageMain () {

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

let startpageTop10 = []; // Array för att spara topp 10 filmer
let best200Movies = [];

// Funktion för att hämta filmer och lägga dem i startpageTop10
async function getFilmsTop10() {
    try {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`;
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

async function best200ever() {
    try {
        const pages = Array.from({ length: 10 }, (_, i) => i + 1);
        const fetchPromises = pages.map(page => {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&without_genres=99&vote_count.gte=200&page=${page}`;
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
                <p id="modal-info">Klicka igen för att stänga</p>
            </div>
            <div id="movie-poster">
                <img src="https://image.tmdb.org/t/p/w300/${film.poster_path}" alt="${film.title}">
            </div>
        </div>
    `;

    // Visa modalen
    modal.classList.remove('hidden');

    // Lägg till en klicklyssnare för att stänga modalen
    modal.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.innerHTML = ''; // Rensa innehållet för att förhindra duplicering
    }, { once: true }); // Se till att eventlisten tas bort efter en gång
}

function showBest200() {
    main.innerHTML = ""; // Töm main innan ny rendering
    const sectionB200 = document.createElement('section');
    sectionB200.id = "b200";

    for (let i = 0; i < best200Movies.length; i++) {
        const film = best200Movies[i];
        
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

        sectionB200.appendChild(container);
    }

    main.appendChild(sectionB200);
}

function handleApiError(statusCode) {
    switch (statusCode) {
        case 200:
            console.log("Success: Data hämtades framgångsrikt.");
            break;
        case 401:
            console.error("Authentication failed: Du har inte behörighet att komma åt tjänsten eller ogiltig API-nyckel.");
            break;
        case 403:
            console.error("Access Denied: Du har inte rätt att komma åt den här resursen.");
            break;
        case 404:
            console.error("Resource not found: Den begärda resursen kunde inte hittas.");
            break;
        case 405:
            console.error("Method not allowed: Ogiltig metod för den här resursen.");
            break;
        case 422:
            console.error("Invalid parameters: De skickade parametrarna är felaktiga.");
            break;
        case 500:
            console.error("Internal server error: Något gick fel på servern.");
            break;
        case 502:
            console.error("Bad Gateway: Problem med att ansluta till backend-servern.");
            break;
        case 503:
            console.error("Service Unavailable: Tjänsten är för närvarande otillgänglig.");
            break;
        case 504:
            console.error("Gateway Timeout: Begäran till backend-servern gick inte igenom.");
            break;
        case 429:
            console.error("Too many requests: Din begäran överskrider den tillåtna gränsen.");
            break;
        default:
            console.error("Okänd felkod: Något gick fel, statuskod:", statusCode);
    }
}