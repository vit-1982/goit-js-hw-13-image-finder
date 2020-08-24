import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import apiServices from './services/apiService';
import cardTemplate from '../templates/cardTemplate.hbs';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', searchFormInputHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);
refs.gallery.addEventListener('click', getLargeImg);

function searchFormInputHandler(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.query.value;

  clearCardItems();

  apiServices.resetPage();

  apiServices.searchQuery = inputValue;
  if (inputValue === '') {
    console.log('enter valid data');
    return;
  }

  apiServices.fetchImages().then(insertCardItems);
}

function loadMoreBtnHandler() {
  if (apiServices.searchQuery === '') {
    return;
  }
  apiServices.fetchImages().then(insertCardItems);
}

function insertCardItems(items) {
  const markup = cardTemplate(items);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearCardItems() {
  refs.gallery.innerHTML = '';
}

function getLargeImg(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  basicLightbox
    .create(
      `<img width="1400" height="900" src="${e.target.dataset.largeImage}">`,
    )
    .show();
}
