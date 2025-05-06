document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.numbers-container');
    
    for (let i = 1; i <= 100; i++) {
        const numberElement = document.createElement('div');
        numberElement.className = `number number-${i}`;
        numberElement.textContent = i;
        container.appendChild(numberElement);
    }
});