const btn = document.querySelector("button");
const text = document.querySelector("h1");
const body = document.querySelector("body");

btn.addEventListener("click", () => {
    const colorValue = generateNewColor();
    body.style.backgroundColor = colorValue;
    text.innerHTML = colorValue;
});

const generateNewColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
};
