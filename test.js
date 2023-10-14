const api_key='715bf0dc401abd16f3b3ecb825b0161c';
const url='https://gnews.io/api/v4/search?q=';




window.addEventListener('load', () => fetchNews("Sports"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res= await fetch(`${url}India ${query}&apikey=${api_key}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';
    articles.forEach(article => {
        if(!article.image) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
  
    });
}

function fillDataInCard(cardClone,article){

    const newsImg = cardClone.querySelector('#news-img')
    const newsTittle = cardClone.querySelector('#news-tittle')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImg.src = article.image;
    newsTittle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"

    })

    newsSource.innerHTML = `${article.source.name} ~ ${date}`

    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(article.url, "_blank")
    })
}
let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id)
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');

}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener('click',() =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;

})
