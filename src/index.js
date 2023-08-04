import { PixabayApi } from './pixabayApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const pixabayApiInstance = new PixabayApi();
//console.log(pixabayApiInstance);

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchQuery = event.target.firstElementChild.value.trim();
  //console.log(searchQuery);

  if (!searchQuery) {
    return;
  }

  pixabayApiInstance.q = searchQuery;

  pixabayApiInstance.fetchPhotos().then(data => {
    //console.log('data:', data.hits);

    const dataArray = data.hits;
    dataArray.map(element => {
      createGalleryCard(element);
      //console.log('element:', element);
    });

    //console.log(data.totalHits);

    if (data.totalHits === 0) {
      Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    } else {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
  });
}
searchForm.addEventListener('submit', handleSearchFormSubmit);

function createGalleryCard(element) {
  const newCard = `<div class="photo-card">
  <img src="${element.previewURL}" alt="${element.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${element.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${element.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${element.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${element.downloads}
    </p>
  </div>
</div>`;
  galleryEl.insertAdjacentHTML('afterbegin', newCard);
}
