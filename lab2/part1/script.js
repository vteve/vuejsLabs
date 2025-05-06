function countOfVisit() {
    let visitCount = localStorage.getItem('visitCount');

    if (visitCount) {
        visitCount = parseInt(visitCount) + 1;
    } else {
        visitCount = 1;
    }

    localStorage.setItem('visitCount', visitCount);
    alert(`Вы посетили эту страницу ${visitCount} раз(а)`);
};

function loadImagesInOrder() {
    const imageUrls = [];

    for (let i = 0; i < 5; i++) {
        const url = prompt(`Введите URL картинки ${i + 1}:`);
        imageUrls.push(url);
    }

    const container = document.createElement('div');
    document.body.appendChild(container);

    imageUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;

        img.onload = () => container.appendChild(img);
        img.onerror = () => {
            const errorMsg = document.createElement('p');
            errorMsg.textContent = "Can't load image";
            container.appendChild(errorMsg);
        };
    });
}

function loadImagesUnordered() {
    const imageUrls = [];

    for (let i = 0; i < 5; i++) {
        const url = prompt(`Введите URL картинки ${i + 1}:`);
        imageUrls.push(url);
    }

    const container = document.createElement('div');
    document.body.appendChild(container);

    imageUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;

        img.onload = () => container.appendChild(img.cloneNode());
        img.onerror = () => {
            const errorMsg = document.createElement('p');
            errorMsg.textContent = "Can't load image";
            container.appendChild(errorMsg);
        };
    });
}

async function loadImagesInOrderAsync() {
    const imageUrls = [];

    for (let i = 0; i < 5; i++) {
        const url = prompt(`Введите URL картинки ${i + 1}:`);
        imageUrls.push(url);
    }

    const container = document.createElement('div');
    document.body.appendChild(container);

    for (const url of imageUrls) {
        try {
            await new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;

                img.onload = () => {
                    container.appendChild(img);
                    resolve();
                };

                img.onerror = () => {
                    const errorMsg = document.createElement('p');
                    errorMsg.textContent = "Can't load image";
                    container.appendChild(errorMsg);
                    resolve();
                };
            });
        } catch (error) {
            console.error(error);
        }
    }
}

async function loadImagesUnorderedAsync() {
    const imageUrls = [];

    for (let i = 0; i < 5; i++) {
        const url = prompt(`Введите URL картинки ${i + 1}:`);
        imageUrls.push(url);
    }

    const container = document.createElement('div');
    document.body.appendChild(container);

    const promises = imageUrls.map(url => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;

            img.onload = () => {
                container.appendChild(img);
                resolve();
            };

            img.onerror = () => {
                const errorMsg = document.createElement('p');
                errorMsg.textContent = "Can't load image";
                container.appendChild(errorMsg);
                resolve();
            };
        });
    });

    await Promise.all(promises);
}

async function checkIPs() {
    const blockedCountries = ["Russian Federation", "Belarus", "Afghanistan", "People's Republic of China", "Vinezuela", "Iran"];
    const ips = [];
    for (let i = 0; i < 5; i++) {
        ips.push(prompt(`Введите IP адрес :`));
    }
    let isBlocked = false;
    const promises = ips.map(async (ip) => {
        try {
            const response = await fetch(`https://json.geoiplookup.io/${ip}`);
            const data = await response.json();
            alert(data.country_name)
            if (data && data.country_name && blockedCountries.includes(data.country_name)) {
                isBlocked = true;
            }
        } catch (error) {
            alert(`Ошибка при проверке IP ${ip}:`, error);
        }
    });
    await Promise.all(promises);
    if (isBlocked) {
        alert("Our services are not available in your country");
    } else {
        alert("Welcome to our website!");
    }
}