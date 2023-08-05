import axios from 'axios';

export class PixabayApi {
  #API_KEY = '38646134-f0d35baa377bc06e37b81532c';
  #BASE_URL = 'https://pixabay.com/api/';

  page = 1;
  q = null;
  per_page = 40;

  fetchPhotos() {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        q: this.q,
        page: this.page,
        key: this.#API_KEY,
        per_page: this.per_page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
  }
}
