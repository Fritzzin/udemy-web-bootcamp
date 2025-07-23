const buttons = document.querySelectorAll("button");

for (let button of buttons) {
    button.addEventListener("click", colorize);
}

const newColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
};

function colorize() {
    this.style.backgroundColor = newColor();
    this.style.color = newColor();
}
