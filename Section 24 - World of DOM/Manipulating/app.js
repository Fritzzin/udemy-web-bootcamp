// const allLinks = document.querySelectorAll('a');

// for (let link of allLinks) {
//     link.innerText = 'I AM A LINK!!!!'
// }

// for (let link of allLinks) {
//     link.style.color = 'rgb(0, 108, 134)';
//     link.style.textDecorationColor = 'magenta';
//     link.style.textDecorationStyle = 'wavy'
// }
//

// Get all images sources
const allImages = document.getElementsByTagName("img");
for (let image of allImages) {
  console.log(image.src);
}

// Get all objects with the class "square"
const squareImages = document.getElementsByClassName("square");

// Get all links inside paragraphs
const links = document.querySelectorAll("p a");
for (let link of links) {
  console.log(link.href);
}


