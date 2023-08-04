import { PixabayApi } from './pixabayApi';

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
    console.log(data);
  });
}
searchForm.addEventListener('submit', handleSearchFormSubmit);

// function createGalleryCard() {
//   const newCard = `<div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>`;
//   galleryEl.insertAdjacentHTML('afterbegin', newCard);
// }
