export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles(searchQuery) {
    const options = {
      headers: {
        Authorization: '7e67887a883b4246beb620db5dcff9af',
      },
    };
    const url = `https://newsapi.org/v2/everything?q=${this.searchQuery}&pageSize=4&page=${this.page}`;
    return fetch(url, options)
      .then(r => r.json())
      .then(data => {
        this.incrementPage();
        console.log(data.articles);
        return data.articles;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
