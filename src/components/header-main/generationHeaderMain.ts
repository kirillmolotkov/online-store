import { buttonSizeWeiv, foundElement, headerMain, searchProductsElement, sortOprionsElement } from '../../const/const';
import { counterFoundItems, sectionGoods } from '../generate-card/generateCardItems';

export const generationHeaderMain = function () {
  headerMain.className = 'goods__header';

  generationSortOptions();
  generationFoundElement(counterFoundItems);
  generationSearchProducts();
  generationButtonSizeWiev();

  sectionGoods?.prepend(headerMain);
};

const generationSortOptions = function () {
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

export const generationFoundElement = function (foundItems: number) {
  foundElement.className = 'found';
  foundElement.innerText = `Found: ${foundItems}`;
  headerMain.append(foundElement);
};

const generationSearchProducts = function () {
  searchProductsElement.className = 'search-products';
  searchProductsElement.type = 'search';
  searchProductsElement.placeholder = 'Search product';

  headerMain.append(searchProductsElement);
};

const generationButtonSizeWiev = function () {
  buttonSizeWeiv.className = 'button-wiev';
  buttonSizeWeiv.innerText = 'Size wiev';

  headerMain.append(buttonSizeWeiv);
};
