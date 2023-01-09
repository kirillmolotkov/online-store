import {
  Data,
  QuantityOfGoodsByBrand,
  QuantityOfGoodsByCategory,
  QuantityOfGoodsByPriceAndStock,
} from '../../types/interfaces';
import {
  asideFilters,
  buttonCopyLink,
  buttonResetFilters,
  filterByBrandContainer,
  filterByCategoryContainer,
  filterByPriceContainer,
  filterByStockContainer,
  priceMax,
  priceMin,
  sortOprionsElement,
  stockMax,
  stockMin,
} from '../../const/const';
import { resetFilter } from './useFilters';
import { resetValueIsCheckedSortOptions } from '../header-main/sortOptions';

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

export const quantityOfGoodsByPriceAndStock: QuantityOfGoodsByPriceAndStock = {
  priceMin: 0,
  priceMax: 0,
  stockMin: 0,
  stockMax: 0,
};

const createFiltersHeader = () => {
  const mainElement = document.querySelector('main');
  asideFilters.className = 'filters';

  const filtersHeader = document.createElement('header');
  filtersHeader.className = 'filters__header';

  buttonResetFilters.className = 'fiters__button-reset, button-filters';
  buttonResetFilters.innerText = 'Reset filters';

  buttonCopyLink.className = 'filters__button-copy-link, button-filters';
  buttonCopyLink.innerText = 'Copy link';

  filtersHeader.append(buttonResetFilters, buttonCopyLink);
  asideFilters?.append(filtersHeader);
  mainElement?.prepend(asideFilters);
};

const createFilterByCategory = (objectCategory: QuantityOfGoodsByCategory) => {
  filterByCategoryContainer.className = 'filters__category';

  const filterByCategoryTitle = document.createElement('h3');
  filterByCategoryTitle.className = 'filters__category-title';
  filterByCategoryTitle.innerText = 'Category';

  filterByCategoryContainer.append(filterByCategoryTitle);

  const keysObjectCategory = Object.keys(objectCategory);

  keysObjectCategory.forEach((keyCategory) => {
    const keyObjectCategory = keyCategory as keyof QuantityOfGoodsByCategory;

    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'item__checkbox-container';

    const checkbox = document.createElement('input');
    checkbox.className = 'category__item-checkbox';
    checkbox.type = 'checkbox';
    checkbox.id = keyObjectCategory;

    const lable = document.createElement('label');
    lable.className = 'category__item-label';
    lable.setAttribute('for', keyObjectCategory);
    lable.innerText = keyObjectCategory;

    const numberGoodsOnStock = document.createElement('span');
    numberGoodsOnStock.className = 'category__item-counter';
    numberGoodsOnStock.innerText = String(objectCategory[keyObjectCategory]);

    checkboxContainer.append(checkbox, lable, numberGoodsOnStock);
    filterByCategoryContainer.append(checkboxContainer);
  });

  asideFilters?.append(filterByCategoryContainer);
};

const createFilterByBrand = (objectBrand: QuantityOfGoodsByBrand) => {
  filterByBrandContainer.className = 'filters__brand';

  const filterByBrandTitle = document.createElement('h3');
  filterByBrandTitle.className = 'filters__brand-title';
  filterByBrandTitle.innerText = 'Brand';

  filterByBrandContainer.append(filterByBrandTitle);

  const keysObjectBrand = Object.keys(objectBrand);

  keysObjectBrand.forEach((keyBrand) => {
    const keyObjectBrand = keyBrand as keyof QuantityOfGoodsByBrand;

    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'item__checkbox-container';

    const checkbox = document.createElement('input');
    checkbox.className = 'brand__item-checkbox';
    checkbox.type = 'checkbox';
    checkbox.id = keyObjectBrand;

    const lable = document.createElement('label');
    lable.className = 'brand__item-label';
    lable.setAttribute('for', keyObjectBrand);
    lable.innerText = keyObjectBrand;

    const numberGoodsOnStock = document.createElement('span');
    numberGoodsOnStock.className = 'brand__item-counter';
    numberGoodsOnStock.innerText = String(objectBrand[keyObjectBrand]);

    checkboxContainer.append(checkbox, lable, numberGoodsOnStock);
    filterByBrandContainer.append(checkboxContainer);
  });

  asideFilters?.append(filterByBrandContainer);
};

const createFilterByPrice = (objectPrice: QuantityOfGoodsByPriceAndStock) => {
  filterByPriceContainer.className = 'filters__price';

  const filterByPriceTitle = document.createElement('h3');
  filterByPriceTitle.className = 'filters__price-title';
  filterByPriceTitle.innerText = 'Price';

  const filterByPriceMinLabel = document.createElement('label');
  filterByPriceMinLabel.className = 'filters__min';
  filterByPriceMinLabel.innerText = 'Min: ';
  filterByPriceMinLabel.setAttribute('for', 'input-min');

  const filterByPriceMinInput = document.createElement('input');
  filterByPriceMinInput.className = 'filter__price-min';
  filterByPriceMinInput.id = 'input-min';
  filterByPriceMinInput.type = 'range';
  filterByPriceMinInput.min = objectPrice.priceMin.toString();
  filterByPriceMinInput.max = objectPrice.priceMax.toString();
  filterByPriceMinInput.value = objectPrice.priceMin.toString();

  priceMin.id = 'price-min-value';
  priceMin.innerText = objectPrice.priceMin.toString();

  const filterByPriceMaxLabel = document.createElement('label');
  filterByPriceMaxLabel.className = 'filters__max';
  filterByPriceMaxLabel.innerText = 'Max: ';
  filterByPriceMaxLabel.setAttribute('for', 'input-max');

  const filterByPriceMaxInput = document.createElement('input');
  filterByPriceMaxInput.className = 'filter__price-max';
  filterByPriceMaxInput.id = 'input-max';
  filterByPriceMaxInput.type = 'range';
  filterByPriceMaxInput.min = objectPrice.priceMin.toString();
  filterByPriceMaxInput.max = objectPrice.priceMax.toString();
  filterByPriceMaxInput.value = objectPrice.priceMax.toString();

  priceMax.id = 'price-max-value';
  priceMax.innerText = objectPrice.priceMax.toString();

  filterByPriceContainer.append(
    filterByPriceTitle,
    filterByPriceMinLabel,
    filterByPriceMinInput,
    filterByPriceMaxLabel,
    filterByPriceMaxInput,
    priceMin,
    priceMax
  );
  asideFilters?.append(filterByPriceContainer);
};

const createFilterByStock = (objectStock: QuantityOfGoodsByPriceAndStock) => {
  filterByStockContainer.className = 'filters__stock';

  const filterByStockTitle = document.createElement('h3');
  filterByStockTitle.className = 'filters__stock-title';
  filterByStockTitle.innerText = 'Stock';

  const filterByStockMinLabel = document.createElement('label');
  filterByStockMinLabel.className = 'filters__min';
  filterByStockMinLabel.innerText = 'Min: ';
  filterByStockMinLabel.setAttribute('for', 'input-min-stok');

  const filterByStockMinInput = document.createElement('input');
  filterByStockMinInput.className = 'filter__stock-min';
  filterByStockMinInput.id = 'input-min-stock';
  filterByStockMinInput.type = 'range';
  filterByStockMinInput.min = objectStock.stockMin.toString();
  filterByStockMinInput.max = objectStock.stockMax.toString();
  filterByStockMinInput.value = objectStock.stockMin.toString();

  stockMin.id = 'stock-min-value';
  stockMin.innerText = objectStock.stockMin.toString();

  const filterByStockMaxLabel = document.createElement('label');
  filterByStockMaxLabel.className = 'filters__max';
  filterByStockMaxLabel.innerText = 'Max: ';
  filterByStockMaxLabel.setAttribute('for', 'input-max-stock');

  const filterByStockMaxInput = document.createElement('input');
  filterByStockMaxInput.className = 'filter__stock-max';
  filterByStockMaxInput.id = 'input-max-stock';
  filterByStockMaxInput.type = 'range';
  filterByStockMaxInput.min = objectStock.stockMin.toString();
  filterByStockMaxInput.max = objectStock.stockMax.toString();
  filterByStockMaxInput.value = objectStock.stockMax.toString();

  stockMax.id = 'stock-max-value';
  stockMax.innerText = objectStock.stockMax.toString();

  filterByStockContainer.append(
    filterByStockTitle,
    filterByStockMinLabel,
    filterByStockMinInput,
    filterByStockMaxLabel,
    filterByStockMaxInput,
    stockMin,
    stockMax
  );
  asideFilters?.append(filterByStockContainer);
};

function getQuantityOfGoodsByCategory(data: Array<Data>) {
  data.forEach((elem) => {
    if (elem.category === 'smartphones') quantityOfGoodsByCategory.smartphones += 1;

    if (elem.category === 'smartwatch') quantityOfGoodsByCategory.smartwatch += 1;

    if (elem.category === 'tablets') quantityOfGoodsByCategory.tablets += 1;

    if (elem.category === 'headphones') quantityOfGoodsByCategory.headphones += 1;

    if (elem.category === 'laptops') quantityOfGoodsByCategory.laptops += 1;
  });

  return quantityOfGoodsByCategory;
}

function getQuantityOfGoodsByBrand(data: Array<Data>) {
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

const getQuantityOfGoodsByPrice = (data: Array<Data>) => {
  const arrPrice: Array<number> = [];
  data.forEach((elem) => {
    arrPrice.push(elem.price);
  });
  const sortArrPrice = arrPrice.sort((a, b) => a - b);
  quantityOfGoodsByPriceAndStock.priceMin = sortArrPrice[0];
  quantityOfGoodsByPriceAndStock.priceMax = sortArrPrice[sortArrPrice.length - 1];
  return quantityOfGoodsByPriceAndStock;
};

const getQuantityOfGoodsByStock = (data: Array<Data>) => {
  const arrStock: Array<number> = [];
  data.forEach((elem) => {
    arrStock.push(elem.stock);
  });
  const sortArrStock = arrStock.sort((a, b) => a - b);
  quantityOfGoodsByPriceAndStock.stockMin = sortArrStock[0];
  quantityOfGoodsByPriceAndStock.stockMax = sortArrStock[sortArrStock.length - 1];
  return quantityOfGoodsByPriceAndStock;
};

export const generationFIlters = (data: Array<Data>) => {
  createFiltersHeader();
  createFilterByCategory(getQuantityOfGoodsByCategory(data));
  createFilterByBrand(getQuantityOfGoodsByBrand(data));
  createFilterByPrice(getQuantityOfGoodsByPrice(data));
  createFilterByStock(getQuantityOfGoodsByStock(data));
};

buttonResetFilters.addEventListener('click', () => {
  resetFilter();
  resetValueIsCheckedSortOptions();
  createFiltersHeader();
  createFilterByCategory(quantityOfGoodsByCategory);
  createFilterByBrand(quantityOfGoodsByBrand);
  createFilterByPrice(quantityOfGoodsByPriceAndStock);
  createFilterByStock(quantityOfGoodsByPriceAndStock);
  window.location.hash = '';
});
