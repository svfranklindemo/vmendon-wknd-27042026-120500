// script.js
export default async function decorate(block) {
    const template = "<a href='[href]' class='itemInner'><div class='itemTxt'><div class='itemTxtTop'><span class='itemTxtTopEditor'>[Author]</span><span class='itemTxtTopDate'>[PublishedDate]</span></div><h3>[Title]</h3></div></a>";

    const firstChildDiv = block.querySelector('div:first-child');
    const innerChildDiv = firstChildDiv.querySelector('div');
    firstChildDiv.classList.add('carousel-content');
    innerChildDiv.classList.add('content');

    const newDiv = document.createElement('div');
    newDiv.classList.add("carousel-cards")
    firstChildDiv.insertAdjacentElement('afterend', newDiv);

    const carousel = document.querySelector('.carousel-cards');

    // Create a new button element
    const button = document.createElement('button');
    button.id = 'nextBtn'; 

    // Append the button to the div
    carousel.insertAdjacentElement('afterend', button);

    const button2 = document.createElement('button');
    button2.id = 'prevBtn';
    carousel.insertAdjacentElement('afterend', button2);

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let cards = [];


    const articleApiUrl = "/godrej-data/articles-list.json";
    const jsonDataUrl = window.origin + articleApiUrl;
    // Carousel navigation
    let currentIndex = 0;
    const numCardsToShow = 4; // Number of cards to show at a time
    // Fetch JSON data
    fetch(jsonDataUrl)
        .then(response => response.json())
        .then(data => {

            // Create cards
            data.data.forEach((item, index) => {
                const card = document.createElement('div');
                card.classList.add('card');
                let temp = template;
                temp = temp.replace("[href]",item.Link);
                temp = temp.replace("[Author]",item.Author);
                temp = temp.replace("[PublishedDate]",item.PublishedDate);
                temp = temp.replace("[Title]",item.Title);
                card.innerHTML = temp;
                carousel.appendChild(card);

            });
            // Show the first 4 cards initially
            cards = document.querySelectorAll('.godrej-carousel-wrapper .card');
            showCards();
        })
        .catch(error => console.error('Error fetching JSON data:', error));




    function showCards() {
        cards.forEach((card, index) => {
            const isVisible = index >= currentIndex && index < currentIndex + numCardsToShow;
            card.style.display = isVisible ? 'block' : 'none';
            card.style.transform = isVisible ? 'translateX(0)' : 'translateX(-100%)';
        });
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= numCardsToShow;
            showCards();
        }
    });
    nextBtn.addEventListener('click', () => {
        if (currentIndex + numCardsToShow < cards.length) {
            currentIndex += numCardsToShow;
            showCards();
        }
    });

}

