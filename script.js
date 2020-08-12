const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let loadingLoop = 0;

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    //getQuote()
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Get Quote From API
async function getQuote() {

    
    loading();

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try{

        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);

        if (data.quoteText.length > 100) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;

        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        complete();

    } catch (error) {

        console.log('oops, we have a problem', error);

        loadingLoop += 1;
        if (loadingLoop < 100) {
            getQuote();
        } else {
            loadingLoop = 0;
            quoteText.innerText = 'Oops... check back later';
            authorText.innerText = 'Server Admin'
            complete()
        }
        
        

    }

}
 
//tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Button Events
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote();
//loading();