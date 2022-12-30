import {
  IsCheckedFilterCategory,
  Data,
  IsCheckedFilterBrand,
  QuantityOfGoodsByPriceAndStock,
} from '../../types/interfaces';
import { generationCardItems, sectionGoods, sendRequest } from '../generate-card/generateCardItems';
import { urlData } from './getDataForFilters';
import {
  asideFilters,
  buttonResetFilters,
  filterByBrandContainer,
  filterByCategoryContainer,
  filterByPriceContainer,
  filterByStockContainer,
  priceMax,
  priceMin,
  stockMax,
  stockMin,
} from '../../const/const';
import { quantityOfGoodsByPriceAndStock } from './generateFilters';

export const isCheckedFilterCategory = {
  smartphones: false,
  smartwatch: false,
  tablets: false,
  headphones: false,
  laptops: false,
};

export const isCheckedFilterBrand = {
  apple: false,
  samsung: false,
  xiaomi: false,
  honor: false,
  huawei: false,
  amazfit: false,
  jbl: false,
  asus: false,
  hp: false,
};

const removeCardItem = function () {
  while (sectionGoods?.childNodes.length !== 0) {
    sectionGoods?.firstChild?.remove();
  }
  sendRequest(urlData)
    .then((data: Array<Data>) => generationCardItems(data))
    .catch((err) => console.log(err));
};
const removeFilter = function () {
  while (filterByCategoryContainer.childNodes.length !== 0) {
    filterByCategoryContainer.firstChild?.remove();
  }
  while (filterByBrandContainer.childNodes.length !== 0) {
    filterByBrandContainer.firstChild?.remove();
  }
  while (filterByPriceContainer.childNodes.length !== 0) {
    filterByPriceContainer.firstChild?.remove();
  }
  while (filterByStockContainer.childNodes.length !== 0) {
    filterByStockContainer.firstChild?.remove();
  }
  while (asideFilters?.childNodes.length !== 0) {
    asideFilters?.firstChild?.remove();
  }
};

export const resetFilter = function (
  objectBrand: IsCheckedFilterBrand,
  objectCategory: IsCheckedFilterCategory,
  objectPriceAndStok: QuantityOfGoodsByPriceAndStock
) {
  for (let key in objectBrand) {
    const keyBrand = key as keyof IsCheckedFilterBrand;
    objectBrand[keyBrand] = false;
  }
  for (let key in objectCategory) {
    const keyCategory = key as keyof IsCheckedFilterCategory;
    objectCategory[keyCategory] = false;
  }

  objectPriceAndStok.priceMax = 1650;
  objectPriceAndStok.priceMin = 50;
  objectPriceAndStok.stockMax = 120;
  objectPriceAndStok.stockMin = 5;

  removeCardItem();
  removeFilter();
};
asideFilters?.addEventListener('click', (event) => {
  let target = event.target as HTMLInputElement;

  if (target.type === 'checkbox') {
    for (let key in isCheckedFilterCategory) {
      if (key === target.getAttribute('id')) {
        isCheckedFilterCategory[key as keyof IsCheckedFilterCategory] = target.checked;
      }
    }
    for (let key in isCheckedFilterBrand) {
      if (key === target.getAttribute('id')) {
        isCheckedFilterBrand[key as keyof IsCheckedFilterBrand] = target.checked;
      }
    }
    removeCardItem();
  }

  if (target.id === 'input-min') {
    quantityOfGoodsByPriceAndStock.priceMin = Number(target.value);
    priceMin.innerText = quantityOfGoodsByPriceAndStock.priceMin.toString();
    removeCardItem();
  }

  if (target.id === 'input-max') {
    quantityOfGoodsByPriceAndStock.priceMax = Number(target.value);
    priceMax.innerText = quantityOfGoodsByPriceAndStock.priceMax.toString();
    removeCardItem();
  }

  if (target.id === 'input-min-stock') {
    quantityOfGoodsByPriceAndStock.stockMin = Number(target.value);
    stockMin.innerText = quantityOfGoodsByPriceAndStock.stockMin.toString();
    removeCardItem();
  }

  if (target.id === 'input-max-stock') {
    quantityOfGoodsByPriceAndStock.stockMax = Number(target.value);
    stockMax.innerText = quantityOfGoodsByPriceAndStock.stockMax.toString();
    removeCardItem();
  }
});
