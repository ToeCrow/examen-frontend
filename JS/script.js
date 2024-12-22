document.addEventListener('DOMContentLoaded', () => {
    showStartPageMain();
    getFilmsTop10();
    best200ever();
});

const main = document.getElementById('main');
document.querySelector('nav').addEventListener('click', (event) => {
    // Kontrollera om användaren klickade på en länk
    if (event.target.tagName === 'A') {
        event.preventDefault(); // Förhindra standard beteende (sidladdning)
        
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
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`);
        const data = await response.json();

        // Hämta endast de 10 första filmerna
        startpageTop10 = data.results.slice(0, 10);
        console.log("startpageTop10: ", startpageTop10)
        
        updateImages();
    } catch (error) {
        console.error('Fel vid hämtning av filmer:', error);
    }
}

async function best200ever() {
    try {
        // Skapa en array med sidor att hämta (1 till 10)
        const pages = Array.from({ length: 10 }, (_, i) => i + 1);

        // Map varje sida till ett fetch-anrop
        const fetchPromises = pages.map(page => 
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&without_genres=99&vote_count.gte=200&page=${page}`)
                .then(response => response.json()) // Omvandla varje fetch-resultat till JSON
        );

        // Kör alla anrop parallellt med Promise.all
        const results = await Promise.all(fetchPromises);

        // Extrahera och kombinera alla filmer från varje sida
         best200Movies = results.flatMap(data => data.results);

        console.log("best200Movies:", best200Movies);
        return best200Movies; // Returnera om du vill använda resultatet vidare
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
