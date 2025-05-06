const counterElement = document.getElementById('counter');
const cpsElement = document.getElementById('cps');
const clickerButton = document.getElementById('clicker');

let count = parseInt(localStorage.getItem('clickerCount')) || 0;
counterElement.textContent = count;

let clicks = 0;
let startTime = Date.now();
let cps = 0;

setInterval(() => {
    const elapsedTime = (Date.now() - startTime) / 1000;
    cps = elapsedTime > 0 ? (clicks / elapsedTime).toFixed(2) : 0;
    cpsElement.textContent = `${cps} кликов в секунду`;
}, 1000);

clickerButton.addEventListener('click', function() {
    count++;
    clicks++;
    counterElement.textContent = count;
    localStorage.setItem('clickerCount', count);
});

setInterval(() => {
    clicks = 0;
    startTime = Date.now();
}, 5000);