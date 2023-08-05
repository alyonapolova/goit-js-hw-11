import { PixabayApi } from './pixabayApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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

  pixabayApiInstance
    .fetchPhotos()
    .then(({ data }) => {
      console.log('data:', data);
      galleryEl.innerHTML = '';
      const dataArray = data.hits;
      dataArray.map(element => {
        createGalleryCard(element);
        //console.log('element:', element);
      });

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      createLightbox();

      //console.log(typeof pixabayApiInstance.baseSearchParams.per_page);
      //console.log(data.totalHits);
      if (data.totalHits <= 40) {
        loadMoreBtn.classList.add('is-hidden');
      } else {
        loadMoreBtn.classList.remove('is-hidden');
      }

      if (data.totalHits === 0) {
        Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      } else {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(err => {
      console.log(err);
    });
}
searchForm.addEventListener('submit', handleSearchFormSubmit);

function handleLoanMoreBtnClick() {
  pixabayApiInstance.page += 1;

  pixabayApiInstance
    .fetchPhotos()
    .then(({ data }) => {
      console.log('data:', data);

      const dataArray = data.hits;
      dataArray.map(element => {
        createGalleryCard(element);
        //console.log('element:', element);
      });

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      const lightBoxInstance = createLightbox();
      lightBoxInstance.refresh();

      const totalPages = Math.ceil(
        data.totalHits / pixabayApiInstance.per_page
      );

      //console.log(typeof pixabayApiInstance.per_page);

      console.log(totalPages);
      if (pixabayApiInstance.page === totalPages) {
        loadMoreBtn.classList.add('is-hidden');
      }
    })
    .catch(err => {
      console.log(err);
    });
}

loadMoreBtn.addEventListener('click', handleLoanMoreBtnClick);

function createGalleryCard(element) {
  const newCard = `<a class="photo-card-link" href="${element.largeImageURL}"><div class="photo-card">
  <img src="${element.webformatURL}" alt="${element.tags}" width="250" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:&nbsp;</b>${element.likes}
    </p>
    <p class="info-item">
      <b>Views:&nbsp;</b>${element.views}
    </p>
    <p class="info-item">
      <b>Comments:&nbsp;</b>${element.comments}
    </p>
    <p class="info-item">
      <b>Downloads:&nbsp;</b>${element.downloads}
    </p>
  </div>
</div></a>`;
  galleryEl.insertAdjacentHTML('beforeend', newCard);
}

function createLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });

  return lightbox;
}
