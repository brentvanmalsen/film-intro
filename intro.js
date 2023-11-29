const slideshow = document.getElementById("slideshow");
const imageArray = [];
const numberOfImages = 35;
const animationDuration = 8000;
const initialScale = 2.0;
const finalScale = 1.0;

// Audio afspelen bij het laden van de pagina
new Audio('./images/marvel_song.mp3').play();

// Vooraf laden van afbeeldingen en ze toevoegen aan de imageArray
for (let i = 1; i <= numberOfImages; i++) {
    const img = new Image();
    img.src = `images/comic${i}.png`;
    img.alt = `Afbeelding ${i}`;
    imageArray.push(img);
}

// Een zwarte afbeelding om na de animatie te tonen
const blackScreen = new Image();
blackScreen.src = "images/black_screen.png";
blackScreen.alt = "Black Screen";
blackScreen.style.opacity = 0; // Begin met een doorzichtige zwarte afbeelding

// Huidige index van de getoonde afbeelding
let currentIndex = 0;

// Tijd waarop de animatie is gestart
let animationStartTime = null;

// Functie om naar de volgende afbeelding te gaan
function nextImage(timestamp) {
    // Als de starttijd van de animatie nog niet is ingesteld, stel deze in
    if (!animationStartTime) {
        animationStartTime = timestamp;
    }

    // Bereken de verstreken tijd sinds het begin van de animatie
    const elapsed = timestamp - animationStartTime;

    // Bereken de voortgang van de animatie als een waarde tussen 0 en 1
    const progress = Math.min(1, elapsed / animationDuration);

    // Bereken de huidige index op basis van de voortgang
    currentIndex = Math.floor(progress * numberOfImages);

    // Als de laatste afbeelding is bereikt, toon de zwarte afbeelding
    if (currentIndex === numberOfImages) {
        slideshow.innerHTML = '';
        slideshow.appendChild(blackScreen);
        fadeBlackScreenIn(); // Roep de fade-in functie aan voor de zwarte afbeelding
    } else {
        // Anders, toon de huidige afbeelding met de juiste schaal
        const img = imageArray[currentIndex];
        img.style.transform = `scale(${initialScale - (initialScale - finalScale) * progress})`;

        slideshow.innerHTML = '';
        slideshow.appendChild(img);

        // Roep de volgende afbeelding aan zolang de animatie nog niet is voltooid
        if (progress < 1) {
            requestAnimationFrame(nextImage);
        }
    }
}

// Functie om de zwarte afbeelding in te laten vervagen (fade-in effect)
function fadeBlackScreenIn() {
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
        opacity += 0.01;
        blackScreen.style.opacity = opacity;

        // Stop de interval als de maximale opacity is bereikt
        if (opacity >= 1) {
            clearInterval(fadeInInterval);
        }
    }, 20); // Elke 20 milliseconden de opacity aanpassen voor een fade-in effect
}

// Roep de functie voor de eerste afbeelding aan
requestAnimationFrame(nextImage);

// Luister naar het laden van de pagina
window.addEventListener("load", function () {
    // Toon het Marvel-logo na 7 seconden
    setTimeout(function () {
        document.getElementById("marvel-logo").classList.remove("hidden");
    }, 7000); // 7 seconden
});

// Na 15 seconden, vervang de huidige pagina door index.html test
setTimeout(function () {
    location.replace("../index.html")
}, 15000);
