const slideshow = document.getElementById("slideshow");
const imageArray = [];
const numberOfImages = 35;
const animationDuration = 8000; // Totaal duur van de animatie in milliseconden (8 seconden)
const initialScale = 2.0; // Begin met een grotere schaal (inzoomen)
const finalScale = 1.0; // Schaal voor de laatste afbeelding (origineel formaat)

for (let i = 1; i <= numberOfImages; i++) {
    imageArray.push(`images/comic${i}.png`);
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

    const img = new Image();
    img.src = imageArray[currentIndex];
    img.alt = `Afbeelding ${currentIndex + 1}`;

    img.style.transform = `scale(${initialScale - (initialScale - finalScale) * progress})`;

    slideshow.innerHTML = '';
    slideshow.appendChild(img);

    if (progress < 1) {
        requestAnimationFrame(nextImage);
    }
}

requestAnimationFrame(nextImage);
