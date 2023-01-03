import { buttonSizeWeiv, foundElement, headerMain, searchProductsElement, sortOprionsElement } from '../../const/const';
import { sectionGoods } from '../generate-card/generateCardItems';

export const generaeteHeaderMain = function () {
  headerMain.className = 'goods__header';

  generaeteSortOptions();
  generateFoundElement();
  generateSearchProducts();
  generateButtonSizeWiev();

  sectionGoods?.append(headerMain);
};

const generaeteSortOptions = function () {
  sortOprionsElement.className = 'sort-options';

  const sortOptionsTitle = document.createElement('option');
  sortOptionsTitle.value = 'sort-title';
  sortOptionsTitle.disabled;
  sortOptionsTitle.selected;
  sortOptionsTitle.innerText = 'Sort options:';

  const optionByPriceMin = document.createElement('option');
  optionByPriceMin.value = 'price-min';
  optionByPriceMin.innerText = 'Sort by price Min';

  const optionByPriceMax = document.createElement('option');
  optionByPriceMax.value = 'price-max';
  optionByPriceMax.innerText = 'Sort by price Max';

  const optionByRatingMin = document.createElement('option');
  optionByRatingMin.value = 'rating-min';
  optionByRatingMin.innerText = 'Sort by rating Min';

  const optionByRatingMax = document.createElement('option');
  optionByRatingMax.value = 'rating-max';
  optionByRatingMax.innerHTML = 'Sort by rating Max';

  sortOprionsElement.append(sortOptionsTitle, optionByPriceMin, optionByPriceMax, optionByRatingMin, optionByRatingMax);
  headerMain.append(sortOprionsElement);
};

const generateFoundElement = function () {
  foundElement.className = 'found';
  foundElement.innerText = 'Found:';
  headerMain.append(foundElement);
};

const generateSearchProducts = function () {
  searchProductsElement.className = 'search-products';
  searchProductsElement.type = 'search';
  searchProductsElement.placeholder = 'Search product';

  headerMain.append(searchProductsElement);
};

const generateButtonSizeWiev = function () {
  buttonSizeWeiv.className = 'button-wiev';
  buttonSizeWeiv.innerText = 'Size wiev';

  headerMain.append(buttonSizeWeiv);
};
