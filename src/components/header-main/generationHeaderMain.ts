import { foundElement, headerMain, searchProductsElement, sortOprionsElement, buttonSizeView } from '../../const/const';
import { IStatusValueButton } from '../../types/interfaces';
import { counterFoundItems, sectionGoods } from '../generate-card/generateCardItems';
import { statusValueButton } from './changeSizeItems';

const createOption = (value: string, innerText: string, disabled = false, selected = false) => {
  const option = document.createElement('option');
  option.value = value;
  option.disabled = disabled;
  option.selected = selected;
  option.innerText = innerText;

  return option;
};

const generationSortOptions = (): void => {
  sortOprionsElement.className = 'sort-options';

  const sortOptionsTitle = createOption('sorttitle', 'Sort options:', true, true);
  const optionByPriceMin = createOption('pricemin', 'Sort by price Min');
  const optionByPriceMax = createOption('pricemax', 'Sort by price Max');
  const optionByRatingMin = createOption('ratingmin', 'Sort by rating Min');
  const optionByRatingMax = createOption('ratingmax', 'Sort by rating Max');

  sortOprionsElement.append(sortOptionsTitle, optionByPriceMin, optionByPriceMax, optionByRatingMin, optionByRatingMax);
  headerMain.append(sortOprionsElement);
};

export const generationFoundElement = (foundItems: number): void => {
  foundElement.className = 'found';
  foundElement.innerText = `Found: ${foundItems}`;
  headerMain.append(foundElement);
};

const generationSearchProducts = (): void => {
  searchProductsElement.className = 'search-products';
  searchProductsElement.type = 'search';
  searchProductsElement.placeholder = 'Search product';

  headerMain.append(searchProductsElement);
};

const generationButtonSizeView = (statusButton: IStatusValueButton): void => {
  buttonSizeView.className = 'button-view';
  if (statusButton.min) buttonSizeView.innerText = `Size view min`;
  if (statusButton.max) buttonSizeView.innerText = `Size view max`;

  headerMain.append(buttonSizeView);
};

export const generationHeaderMain = (): void => {
  headerMain.className = 'goods__header';

  generationSortOptions();
  generationFoundElement(counterFoundItems);
  generationSearchProducts();
  generationButtonSizeView(statusValueButton);

  sectionGoods?.prepend(headerMain);
};
