import { IsCheckedFilterCategory, Data, IsCheckedFilterBrand } from '../../types/interfaces';
import { counterFoundItems, generationCardItems, sectionGoods, sendRequest } from '../generate-card/generateCardItems';

import {
  asideFilters,
  filterByBrandContainer,
  filterByCategoryContainer,
  filterByPriceContainer,
  filterByStockContainer,
  priceMax,
  priceMin,
  stockMax,
  stockMin,
  urlData,
} from '../../const/const';
import { quantityOfGoodsByPriceAndStock } from './generateFilters';
import { generationFoundElement } from '../header-main/generationHeaderMain';
import { changeSizeItems } from '../header-main/changeSizeItems';
import { generationStringRouting } from '../routing/routing';

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

export const removeCardItem = () => {
  while (sectionGoods?.childNodes.length !== 1) {
    sectionGoods?.lastChild?.remove();
  }
  sendRequest(urlData)
    .then((data: Array<Data>) => {
      generationFoundElement(counterFoundItems);
      generationCardItems(data);
      changeSizeItems();
    })
    .catch((err) => console.log(err));
};

const removeFilter = () => {
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

export const resetFilter = () => {
  const keysObjectBrand = Object.keys(isCheckedFilterBrand);

  keysObjectBrand.forEach((key) => {
    const keyObjectBrand = key as keyof IsCheckedFilterBrand;
    isCheckedFilterBrand[keyObjectBrand] = false;
  });

  const keysObjectCategory = Object.keys(isCheckedFilterCategory);

  keysObjectCategory.forEach((key) => {
    const keyObjectCategory = key as keyof IsCheckedFilterCategory;
    isCheckedFilterCategory[keyObjectCategory] = false;
  });

  quantityOfGoodsByPriceAndStock.priceMax = 1650;
  quantityOfGoodsByPriceAndStock.priceMin = 50;
  quantityOfGoodsByPriceAndStock.stockMax = 120;
  quantityOfGoodsByPriceAndStock.stockMin = 5;

  removeCardItem();
  removeFilter();
};

asideFilters?.addEventListener('click', (event) => {
  const target = event.target as HTMLInputElement;

  if (target.type === 'checkbox') {
    const keysFilterCategory = Object.keys(isCheckedFilterCategory);

    keysFilterCategory.forEach((key) => {
      const keyFilterCategory = key as keyof IsCheckedFilterCategory;
      if (keyFilterCategory === target.getAttribute('id')) {
        isCheckedFilterCategory[keyFilterCategory] = target.checked;
        window.location.hash = generationStringRouting();
      }
    });

    const keysFilterBrand = Object.keys(isCheckedFilterBrand);

    keysFilterBrand.forEach((key) => {
      const keyFilterBrand = key as keyof IsCheckedFilterBrand;
      if (keyFilterBrand === target.getAttribute('id')) {
        isCheckedFilterBrand[keyFilterBrand] = target.checked;
        window.location.hash = generationStringRouting();
      }
    });
    removeCardItem();
  }

  if (target.id === 'input-min') {
    quantityOfGoodsByPriceAndStock.priceMin = Number(target.value);
    priceMin.innerText = quantityOfGoodsByPriceAndStock.priceMin.toString();
    window.location.hash = generationStringRouting();
    removeCardItem();
  }

  if (target.id === 'input-max') {
    quantityOfGoodsByPriceAndStock.priceMax = Number(target.value);
    priceMax.innerText = quantityOfGoodsByPriceAndStock.priceMax.toString();
    window.location.hash = generationStringRouting();
    removeCardItem();
  }

  if (target.id === 'input-min-stock') {
    quantityOfGoodsByPriceAndStock.stockMin = Number(target.value);
    stockMin.innerText = quantityOfGoodsByPriceAndStock.stockMin.toString();
    window.location.hash = generationStringRouting();

    removeCardItem();
  }

  if (target.id === 'input-max-stock') {
    quantityOfGoodsByPriceAndStock.stockMax = Number(target.value);
    stockMax.innerText = quantityOfGoodsByPriceAndStock.stockMax.toString();
    window.location.hash = generationStringRouting();
    removeCardItem();
  }
});
