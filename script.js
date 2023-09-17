const slideshow = document.getElementById("slideshow");
const imageArray = [];
const numberOfImages = 35;
const animationDuration = 8000; // Totaal duur van de animatie in milliseconden (8 seconden)
const initialScale = 2.0; // Begin met een grotere schaal (inzoomen)
const finalScale = 1.0; // Schaal voor de laatste afbeelding (origineel formaat)

// Vooraf laden van afbeeldingen
for (let i = 1; i <= numberOfImages; i++) {
    const img = new Image();
    img.src = `images/comic${i}.png`;
    img.alt = `Afbeelding ${i}`;
    imageArray.push(img);
}

const blackScreen = new Image();
blackScreen.src = "images/black_screen.png";
blackScreen.alt = "Black Screen";
blackScreen.style.opacity = 0; // Begin met een doorzichtige zwarte afbeelding

let currentIndex = 0;
let animationStartTime = null;

function nextImage(timestamp) {
    if (!animationStartTime) {
        animationStartTime = timestamp;
    }

    const elapsed = timestamp - animationStartTime;
    const progress = Math.min(1, elapsed / animationDuration);

    currentIndex = Math.floor(progress * numberOfImages);

    if (currentIndex === numberOfImages) {
        // Laatste afbeelding bereikt, toon de zwarte afbeelding
        slideshow.innerHTML = '';
        slideshow.appendChild(blackScreen);
        fadeBlackScreenIn();
    } else {
        const img = imageArray[currentIndex];
        img.style.transform = `scale(${initialScale - (initialScale - finalScale) * progress})`;

        slideshow.innerHTML = '';
        slideshow.appendChild(img);

        if (progress < 1) {
            requestAnimationFrame(nextImage);
        }
    }
}

function fadeBlackScreenIn() {
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
        opacity += 0.01;
        blackScreen.style.opacity = opacity;

        if (opacity >= 1) {
            clearInterval(fadeInInterval);
        }
    }, 20); // Elke 20 milliseconden de opacity aanpassen voor een fade-in effect
}

requestAnimationFrame(nextImage);

window.addEventListener("load", function() {
    setTimeout(function() {
        document.getElementById("marvel-logo").classList.remove("hidden");
    }, 7000); // 10 seconden
});
