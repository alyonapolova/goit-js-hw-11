export class PixabayApi {
  #API_KEY = '38646134-f0d35baa377bc06e37b81532c';
  #BASE_URL = 'https://pixabay.com/api/';

  baseSearchParams = {
    key: this.#API_KEY,
    per_page: 40,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  page = 1;
  q = null;

  fetchPhotos() {
    const searchParams = new URLSearchParams({
      ...this.baseSearchParams,
      q: this.q,
      page: this.page,
    });

    return fetch(`${this.#BASE_URL}?${searchParams}`).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
