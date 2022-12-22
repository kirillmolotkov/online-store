import { getDataForFilters } from './getDataForFilters';
import { urlData } from './getDataForFilters';
import { Data, QuantityOfGoodsByCategory } from '../../types/interfaces';

const asideFilters = document.querySelector('.filters');
const quantityOfGoodsByCategory: QuantityOfGoodsByCategory = {
  smartphones: 0,
  smartwatch: 0,
  tablets: 0,
  headphones: 0,
  laptops: 0,
};

const createFiltersHeader = function () {
  const filtersHeader = document.createElement('header');
  filtersHeader.className = 'filters__header';

  const buttonResetFilters = document.createElement('button');
  buttonResetFilters.className = 'fiters__button-reset, button-filters';
  buttonResetFilters.innerText = 'Reset filters';

  const buttonCopyLink = document.createElement('button');
  buttonCopyLink.className = 'filters__button-copy-link, button-filters';
  buttonCopyLink.innerText = 'Copy link';

  filtersHeader.append(buttonResetFilters, buttonCopyLink);
  asideFilters?.append(filtersHeader);
};

createFiltersHeader();

const createFilterByCategory = function (objectCategory: QuantityOfGoodsByCategory) {
  const filterByCategoryContainer = document.createElement('div');
  filterByCategoryContainer.className = 'filters__category';

  const filterByCategoryTitle = document.createElement('h3');
  filterByCategoryTitle.className = 'filters__category-title';
  filterByCategoryTitle.innerText = 'Category';

  filterByCategoryContainer.append(filterByCategoryTitle);

  for (let key in objectCategory) {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'item__checkbox-container';

    const checkbox = document.createElement('input');
    checkbox.className = 'category__item-checkbox';
    checkbox.type = 'checkbox';
    checkbox.id = key;

    const lable = document.createElement('label');
    lable.className = 'category__item-label';
    lable.setAttribute('for', key);
    lable.innerText = key;

    const numberGoodsOnStock = document.createElement('span');
    numberGoodsOnStock.className = 'category__item-counter';
    numberGoodsOnStock.innerText = String(objectCategory[key as keyof QuantityOfGoodsByCategory]);

    checkboxContainer.append(checkbox, lable, numberGoodsOnStock);
    filterByCategoryContainer.append(checkboxContainer);
  }

  asideFilters?.append(filterByCategoryContainer);
};

function getQuantityOfGoodsByCategory(data: Array<Data>): QuantityOfGoodsByCategory {
  data.forEach((elem) => {
    if (elem.category === 'smartphones') quantityOfGoodsByCategory.smartphones += 1;

    if (elem.category === 'smartwatch') quantityOfGoodsByCategory.smartwatch += 1;

    if (elem.category === 'tablets') quantityOfGoodsByCategory.tablets += 1;

    if (elem.category === 'headphones') quantityOfGoodsByCategory.headphones += 1;

    if (elem.category === 'laptops') quantityOfGoodsByCategory.laptops += 1;
  });

  return quantityOfGoodsByCategory;
}

getDataForFilters(urlData)
  .then((data: Array<Data>) => createFilterByCategory(getQuantityOfGoodsByCategory(data)))
  .catch((err) => console.log(err));
