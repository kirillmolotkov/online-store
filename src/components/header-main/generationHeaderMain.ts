import { foundElement, headerMain, searchProductsElement, sortOprionsElement, buttonSizeView } from '../../const/const';
import { IStatusValueButton } from '../../types/interfaces';
import { counterFoundItems, sectionGoods } from '../generate-card/generateCardItems';
import { statusValueButton } from './changeSizeItems';

export const generationHeaderMain = function () {
  headerMain.className = 'goods__header';

  generationSortOptions();
  generationFoundElement(counterFoundItems);
  generationSearchProducts();
  generationButtonSizeView(statusValueButton);

  sectionGoods?.prepend(headerMain);
};

const generationSortOptions = function () {
  sortOprionsElement.className = 'sort-options';

  const sortOptionsTitle = document.createElement('option');
  sortOptionsTitle.value = 'sorttitle';
  sortOptionsTitle.disabled = true;
  sortOptionsTitle.selected = true;
  sortOptionsTitle.innerText = 'Sort options:';

  const optionByPriceMin = document.createElement('option');
  optionByPriceMin.value = 'pricemin';
  optionByPriceMin.innerText = 'Sort by price Min';

  const optionByPriceMax = document.createElement('option');
  optionByPriceMax.value = 'pricemax';
  optionByPriceMax.innerText = 'Sort by price Max';

  const optionByRatingMin = document.createElement('option');
  optionByRatingMin.value = 'ratingmin';
  optionByRatingMin.innerText = 'Sort by rating Min';

  const optionByRatingMax = document.createElement('option');
  optionByRatingMax.value = 'ratingmax';
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

const generationButtonSizeView = function (statusButton: IStatusValueButton) {
  buttonSizeView.className = 'button-view';
  if (statusButton.min) buttonSizeView.innerText = `Size view min`;
  if (statusButton.max) buttonSizeView.innerText = `Size view max`;

  headerMain.append(buttonSizeView);
};
