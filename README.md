# examen-frontend
Utveckla applikationen "FilmSamlaren" för Hemmakväll som avslutande frontend-examination. Demonstrera kunskaper i JSON-hantering, HTTP/HTTPS-förfrågningar, asynkrona funktioner (async/await med try/catch), samt dynamisk webbutveckling med HTML, CSS, JS och grundläggande UX/UI med WCAG-anpassning.

För att köra den lokalt ladda ner repot till din dator. Öppna det sen med vscode och högerklicka på index.html, välj sedan "open with live server" för att få upp sidan.

Länk till Figma: https://www.figma.com/design/mCLi7j9tqmRK0WwARk5nlb/Examen-Frontend?node-id=0-1&t=UbnSy6SdFCutdera-1

Jag har hanterat json-data med respons.json för att konvertera streamen till js-objekt.
Varje async function har en fetch med async/await samt try/catch. Har en promise.all för att hämta all data på en gång och spara tid för användaren. 
Det finns en "loading"-skärm, som gör att det syns för användaren om det tar lite tid att ladda.
Har använt en semantisk uppbyggd html-struktur, det finns alt-text på bilder och bra kontrast för att kunna läsa enkelt.
Sidan är responsiv på alla sidor och en mock finns i Figma för alla skärmar/sidor.

I uppgiften har jag använt TMDB's api*: https://developer.themoviedb.org/docs/getting-started

Jag gör två hämtningar av filmer med endpointen https://api.themoviedb.org/3/discover/movie.
Den första med parameter för API nyckel, språk på engelska, inget vuxet material, sida 1, samt den viktigaste - sortera efter populäritet från högst till lägst.

Den andra filmsökningen görs med en loop på parametern sida (page) för att hämta 10x20 filmer, 200 totalt.
Den sorterar i stället högsta betyg från högst till lägst, samt tar bort alla dokumentärer, och inga filmer med mindre än 200 röster. Förutom nyckel, språk och vuxenmaterial.

Min sista hämtning hämtar alla kategorier som finns. Då man får med en sifferkombination för kategorier i filmhämtningarna, behövs den för att koppla siffrorna till kategorin.
Den använder denna endpoint https://api.themoviedb.org/3/genre/movie/list.
Lägger endast till nyckel och språk som parameter här.