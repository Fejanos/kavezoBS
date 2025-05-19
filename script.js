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
            img.className = 'd-block w-100';
            img.alt = item.title; // alternatív szöveg a képhez

            // új div, ami cím és leírás
            const caption = document.createElement('div');
            caption.className = 'carousel-caption d-none d-md-block';

            // új elem egy címsor <h5>
            const title = document.createElement('h5');
            title.textContent = item.title;

            // p - leírás - kávé leírása
            const paragraph = document.createElement('p');
            paragraph.textContent = item.description;

            // cím, leírás hozzáadása a caption div-hez
            caption.appendChild(title);
            caption.appendChild(paragraph);

            // kép, caption hozzáadása a slide-hoz
            carouselItem.appendChild(img);
            carouselItem.appendChild(caption);

            // kész slide hozzáadása a carousel belső tartalmához
            inner.appendChild(carouselItem);
        })
    })
    .catch(error => {
        console.error('Fetch során hiba történt: ' + error);
    });