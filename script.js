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

let currentIndex = 0;
let animationStartTime = null;

function nextImage(timestamp) {
    if (!animationStartTime) {
        animationStartTime = timestamp;
    }

    const elapsed = timestamp - animationStartTime;
    const progress = Math.min(1, elapsed / animationDuration);

    currentIndex = Math.floor(progress * numberOfImages);

    const img = imageArray[currentIndex];

    img.style.transform = `scale(${initialScale - (initialScale - finalScale) * progress})`;

    slideshow.innerHTML = '';
    slideshow.appendChild(img);

    if (progress < 1) {
        requestAnimationFrame(nextImage);
    }
}

requestAnimationFrame(nextImage);
