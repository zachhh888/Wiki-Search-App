const searchbar = document.querySelector('.js-search-form');
searchbar.addEventListener('submit', searchmission);

async function searchmission(event) {
    event.preventDefault();
    resultsListArea.innerHTML="";
    const searchTopic = document.getElementById('searchBox').value.trim();
    console.log(searchTopic);
    const spinner = document.querySelector('.js-spinner');
    spinner.classList.remove('hidden');

// fetch response from wikipedia search engine 
    try {
        const results = await getResponse(searchTopic);
        console.log(results);
        displayResults(results);
    } catch(error) {
        console.log(error);
        alert('error retreiving results');
    } finally {
        spinner.classList.add('hidden');
      }
};

async function getResponse(searchTopic) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchTopic}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const json = await response.json();
    return json
}

// display list of URL linked search results 
const resultsListArea = document.querySelector('.search-results');
function displayResults(results) {
    const resultsList=results.query.search;
    
resultsList.forEach(result => {
    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
    console.log(url);
    var resultValue = document.createElement("li");
    var resultValueAnchor = document.createElement("a");
resultValueAnchor.textContent=`${result.title}`;
resultValueAnchor.href = `https://en.wikipedia.org/?curid=${result.pageid}`;
resultValue.appendChild(resultValueAnchor);
resultsListArea.appendChild(resultValue);
    
});     
}
