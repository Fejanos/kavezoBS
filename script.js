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

            // az első elem esetén akítvnak jelöljük
            if(index === 0){
                indicator.className = 'active';
                indicator.ariaCurrent = 'true';
            }

            // hozzáadjuk az indikátort a dokumentumhoz
            indicators.appendChild(indicator);

            // új div - ami egy carousel elem (slide) lesz
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item';

            // első elem aktiválása induláskor
            if(index === 0){
                carouselItem.classList.add('active');
            }

            // <img> elem
            const img = document.createElement('img');
            img.src = item.image; // kép URL az API válaszból
            img.alt = item.title; // alternatív szöveg a képhez
        })
    })
    .catch(error => {
        console.error('Fetch során hiba történt: ' + error);
    });