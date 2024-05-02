// API Schlüsssel von newsapi.org
const API_KEY = 'db2789374926495da306d05e6aab2859';

let currentPage = 1;
let currentCategory = null;
let currentKeyword = null;
let isLoading = false;
let lastArticleCount = 0;

function fetchNews(isSearching){
    if (isLoading) return;

    isLoading = true;
    let url;
    if (isSearching){
        const keyword = document.getElementById('searchKeyword').value;
        url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}&page=${currentPage}`;
    }
    else{
        const category = currentCategory || document.getElementById('category').value;
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}&page{currentPage}`;
    }

    fetch(url).then(response => response.json()).then(data => {
        const newsContainer = document.getElementById('newsContainer');

        if (currentPage === 1) {
            newsContainer.innerHTML = '';
        }

        const articlesWithImage = data.aticles.filter(article => article.urlToImage);

        if (articlesWithImage === 0 || articlesWithImage.length === lastArticleCount) {
            displayNoMoreNews();
            return;
        }

        lastArticleCount = articlesWithImage.length;

        articlesWithImage.foreach(article =>{
            const newsItem = `
                <div className="newsItem">
                    <div className="newsImage">
                        <img src="${article.urlToImage}" alt="${article.title}">
                    </div>
                    <div className="newsContent">
                        <div className="info">
                            <h5>${article.source.name}</h5>
                            <span> | </span>
                            <h5>${article.puplishedAt}</h5>
                        </div>
                        <h2>${article.title}</h2>
                        <p>${article.description}</p>
                        <a href="${article.url} target="_blank">Lese mehr<a/>
                    </div>
                </div>    
            `;

            newsContainer.innerHTML += newsItem;
        });

        currentPage++;
        isLoading = false;
    }).catch(error => {
        console.error("Es ist ein Fehler aufgetreten:", error);
        isLoading = false;
    });    
}    