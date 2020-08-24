const baseUrl = 'https://pixabay.com/api/';

export default {
  page: 1,
  query: '',
  key: '18005761-f8db0c46c56ca66ea07f985e4',
  fetchImages() {
    const requestParams = `?key=${this.key}&q=${this.query}&page=${this.page}&per_page=12`;
    return fetch(baseUrl + requestParams)
      .then(res => res.json())
      .then(parsedResponse => {
        this.incrementPage();
        return parsedResponse.hits;
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
