const slideshow = document.getElementById("slideshow");
const imageArray = [];
const numberOfImages = 35;

for (let i = 1; i <= numberOfImages; i++) {
    imageArray.push(`images/comic${i}.png`);
}

let currentIndex = 0;

function nextImage() {
    const img = new Image();
    img.src = imageArray[currentIndex];
    img.alt = `Afbeelding ${currentIndex + 1}`;
    
    slideshow.innerHTML = '';
    slideshow.appendChild(img);

    currentIndex = (currentIndex + 1) % numberOfImages;
}

setInterval(nextImage, 12000 / numberOfImages);
