import { getDataForFilters } from './getDataForFilters';
import { urlData } from './getDataForFilters';
import { Data, QuantityOfGoodsByBrand, QuantityOfGoodsByCategory } from '../../types/interfaces';

export const asideFilters = document.querySelector('.filters');
export const filterByCategoryContainer = document.createElement('div');
export const filterByBrandContainer = document.createElement('div');

const quantityOfGoodsByCategory: QuantityOfGoodsByCategory = {
  smartphones: 0,
  smartwatch: 0,
  tablets: 0,
  headphones: 0,
  laptops: 0,
};

const quantityOfGoodsByBrand: QuantityOfGoodsByBrand = {
  apple: 0,
  samsung: 0,
  xiaomi: 0,
  honor: 0,
  huawei: 0,
  amazfit: 0,
  jbl: 0,
  asus: 0,
  hp: 0,
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

const createFilterByBrand = function (objectBrand: QuantityOfGoodsByBrand) {
  filterByBrandContainer.className = 'filters__brand';

  const filterByBrandTitle = document.createElement('h3');
  filterByBrandTitle.className = 'filters__brand-title';
  filterByBrandTitle.innerText = 'Brand';

  filterByBrandContainer.append(filterByBrandTitle);

  for (let key in objectBrand) {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'item__checkbox-container';

    const checkbox = document.createElement('input');
    checkbox.className = 'brnad__item-checkbox';
    checkbox.type = 'checkbox';
    checkbox.id = key;

    const lable = document.createElement('label');
    lable.className = 'brand__item-label';
    lable.setAttribute('for', key);
    lable.innerText = key;

    const numberGoodsOnStock = document.createElement('span');
    numberGoodsOnStock.className = 'brand__item-counter';
    numberGoodsOnStock.innerText = String(objectBrand[key as keyof QuantityOfGoodsByBrand]);

    checkboxContainer.append(checkbox, lable, numberGoodsOnStock);
    filterByBrandContainer.append(checkboxContainer);
  }

  asideFilters?.append(filterByBrandContainer);
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

function getQuantityOfGoodsByBrand(data: Array<Data>): QuantityOfGoodsByBrand {
  data.forEach((elem) => {
    if (elem.brand.toLowerCase() === 'amazfit') quantityOfGoodsByBrand.amazfit += 1;

    if (elem.brand.toLowerCase() === 'apple') quantityOfGoodsByBrand.apple += 1;

    if (elem.brand.toLowerCase() === 'asus') quantityOfGoodsByBrand.asus += 1;

    if (elem.brand.toLowerCase() === 'honor') quantityOfGoodsByBrand.honor += 1;

    if (elem.brand.toLowerCase() === 'hp') quantityOfGoodsByBrand.hp += 1;

    if (elem.brand.toLowerCase() === 'huawei') quantityOfGoodsByBrand.huawei += 1;

    if (elem.brand.toLowerCase() === 'jbl') quantityOfGoodsByBrand.jbl += 1;

    if (elem.brand.toLowerCase() === 'samsung') quantityOfGoodsByBrand.samsung += 1;

    if (elem.brand.toLowerCase() === 'xiaomi') quantityOfGoodsByBrand.xiaomi += 1;
  });

  return quantityOfGoodsByBrand;
}

getDataForFilters(urlData)
  .then((data: Array<Data>) => {
    createFilterByCategory(getQuantityOfGoodsByCategory(data));
    createFilterByBrand(getQuantityOfGoodsByBrand(data));
  })
  .catch((err) => console.log(err));
