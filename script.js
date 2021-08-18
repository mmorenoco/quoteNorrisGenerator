//UI Variables
const jokeContainer = document.getElementById('joke-container');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const newTQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show loading
function showLoadingSpinner(){
   loader.hidden = false;
   jokeContainer.hidden = true;
}

//Hide loading
function hideLoadingSpinner(){
   if(!loader.hidden){
      jokeContainer.hidden = false;
      loader.hidden = true;
   }
}

//Get quote from API
async function getQuote() {
   showLoadingSpinner();
   const apiURL = 'https://api.chucknorris.io/jokes/random';

   try {
      const response = await fetch(apiURL);
      const data = await response.json();
   
      //Reduce font size for long quotes
      if(data.value.length > 120){
         quoteText.classList.add('.long-quote');
      } else {
         quoteText.classList.remove('long-quote');
      }
      quoteText.innerText = data.value;

      //Stop loader, show quote
      hideLoadingSpinner();
   } catch(e){
      console.log('Error:', e);
      getQuote();
   }

}

//Tweet quote
function tweetQuote(){
   const quote = quoteText.innerText;
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}`;
   window.open(twitterUrl, 'blank');
}

//Event Listeners
newTQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On load
getQuote();
