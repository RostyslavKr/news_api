import NewsApiService from './js/components/new-service.js';
// import articlesTpl from './articles.hbs';
const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const newsApiService = new NewsApiService();

function onSearch(e) {
  e.preventDefault();
  clearArticlesContainer();
  newsApiService.query = e.currentTarget.elements.query.value;
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(data => {
    createMarkup(data);
  });
}

function onLoadMore() {
  newsApiService.fetchArticles().then(data => {
    createMarkup(data);
  });
}

// function appendArticlesMarkup(articles) {
//   refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
// }

function createMarkup(articles) {
  const markup = articles
    .map(
      ({ url, urlToImage, title, author, description }) => `<li>
    <a href="${url}" target="_blank" rel="noopener noreferrer">
        <article>
            <img src="${urlToImage}" alt="" width="480">
            <h2>${title}</h2>
            <p>Posted by: ${author}</p>
            <p>${description}</p>
        </article>
    </a>
</li>`
    )
    .join('');
  refs.articlesContainer.insertAdjacentHTML('beforeend', markup);
}
function clearArticlesContainer() {
  return (refs.articlesContainer.innerHTML = '');
}
