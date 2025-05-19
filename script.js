// Adat lekérés a végpontról
fetch('https://api.sampleapis.com/coffee/hot')
    .then(response => {
        // Sikeresség ellenőrzése
        if(!response.ok){
            throw new Error('Hiba: ' + response.statusText);
        }
        // Ha rendben van -> JSON visszatérés
        return response.json();
    })
    // JSON-nal dolgozunk
    .then(data => {
        const indicators = document.getElementById('carousel-indicators');
        const inner = document.getElementById('carousel-inner');

        data.forEach((item, index) => {
            // új gomb
            const indicator = document.createElement('button');
            // típus beállítás
            indicator.type = 'button';
            // beállítjuk a carouselhez
            indicator.dataset.bsTarget = '#carouselExampleCaptions';
            // hányadik elemre mutasson
            indicator.dataset.bsSlideTo = index;
            indicator.arialLabel = 'Slide ' + (index + 1);
        })
    })
    .catch(error => {
        console.error('Fetch során hiba történt: ' + error);
    });