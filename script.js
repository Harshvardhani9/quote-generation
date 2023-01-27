const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

let apiQuotes = [];

//show new quote
function newQuote() {
    //Pick a random quote from apiQuotes[]
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    //check if Author field is blank and replace it with 'Unknow'
    if (!quote.author) {
        authorText.textContent = 'Unknow';
    }
    else {
        authorText.textContent = quote.author;
    }
    //check quote length to determine the styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
}

// Get quotes from API using Async fetch request  
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //catch error here

    }
}


// to Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/internet/tweet?text=${quoteText.textContent}- ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

//on load
getQuotes();