let maximum = parseInt(prompt("Enter the maximum number:"));
while (!maximum) {
  maximum = parseInt(prompt("Enter the maximum number:"));
}

const targetNum = Math.floor(Math.random() * maximum) + 1;
// console.log(targetNum);

let guess = prompt("Enter your first guess:");
let attemps = 1;

while (parseInt(guess) !== targetNum) {
  if (guess === "q") break;
  attemps++;
  if (guess > targetNum) {
    guess = prompt("Too high! Enter a new guess:");
  } else {
    guess = prompt("Too low! Enter a new guess:");
  }
}

if (guess === "q") {
  console.log("Quitting");
} else {
  console.log(`You got it! it took you ${attemps} guess(es)!`);
}
