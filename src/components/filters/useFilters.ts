import {
  IsCheckedFilterCategory,
  Data,
  IsCheckedFilterBrand,
  QuantityOfGoodsByPriceAndStock,
  IDismantledAdrressBar,
} from '../../types/interfaces';
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
import { generationFIlters, quantityOfGoodsByPriceAndStock } from './generateFilters';
import { generationFoundElement, generationHeaderMain } from '../header-main/generationHeaderMain';
import { changeSizeItems } from '../header-main/changeSizeItems';
import { generationStringRouting } from '../routing/routing';
import { parsingAdrressBar } from '../routing/parsingAdrressBar';
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
        window.location.hash = generationStringRouting();
      }
    }
    for (let key in isCheckedFilterBrand) {
      if (key === target.getAttribute('id')) {
        isCheckedFilterBrand[key as keyof IsCheckedFilterBrand] = target.checked;
        window.location.hash = generationStringRouting();
      }
    }
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

window.addEventListener('load', () => {
  setTimeout(() => {
    const itemCheckBoxCategory = document.querySelectorAll('.category__item-checkbox');
    const itemCheckBoxBrand = document.querySelectorAll('.brand__item-checkbox');
    const filterPriceMin = document.querySelector('.filter__price-min') as HTMLInputElement;
    const filterPriceMax = document.querySelector('.filter__price-max') as HTMLInputElement;
    const filterPriceMinSpanElement = document.querySelector('#price-min-value') as HTMLSpanElement;
    const filterPriceMaxSpanElement = document.querySelector('#price-max-value') as HTMLSpanElement;
    const filterStockMin = document.querySelector('.filter__stock-min') as HTMLInputElement;
    const filterStockMax = document.querySelector('.filter__stock-max') as HTMLInputElement;
    const filterStockMinSpanElement = document.querySelector('#stock-min-value') as HTMLSpanElement;
    const filterStockMaxSpanElement = document.querySelector('#stock-max-value') as HTMLSpanElement;
    const adressBarObject = parsingAdrressBar();

    for (let key in adressBarObject) {
      const keyAdrressBar = key as keyof IDismantledAdrressBar;

      if (keyAdrressBar === 'category') {
        for (let key in isCheckedFilterCategory) {
          const keyCategory = key as keyof IsCheckedFilterCategory;
          adressBarObject[keyAdrressBar].forEach((elem) => {
            if (keyCategory === elem) {
              isCheckedFilterCategory[keyCategory] = true;
            }
          });
        }
      }
      if (keyAdrressBar === 'brand') {
        for (let key in isCheckedFilterBrand) {
          const keyBrand = key as keyof IsCheckedFilterBrand;
          adressBarObject[keyAdrressBar].forEach((elem) => {
            if (keyBrand === elem) {
              isCheckedFilterBrand[keyBrand] = true;
            }
          });
        }
      }
      if (keyAdrressBar === 'price') {
        filterPriceMin.value = adressBarObject.price[0];
        filterPriceMinSpanElement.innerText = adressBarObject.price[0];
        quantityOfGoodsByPriceAndStock.priceMin = Number(adressBarObject.price[0]);

        filterPriceMax.value = adressBarObject.price[1];
        filterPriceMaxSpanElement.innerText = adressBarObject.price[1];
        quantityOfGoodsByPriceAndStock.priceMax = Number(adressBarObject.price[1]);
      }
      if (keyAdrressBar === 'stock') {
        filterStockMin.value = adressBarObject.stock[0];
        filterStockMinSpanElement.innerText = adressBarObject.stock[0];
        quantityOfGoodsByPriceAndStock.stockMin = Number(adressBarObject.stock[0]);

        filterStockMax.value = adressBarObject.stock[1];
        filterStockMaxSpanElement.innerText = adressBarObject.stock[1];
        quantityOfGoodsByPriceAndStock.stockMax = Number(adressBarObject.stock[1]);
      }
    }

    itemCheckBoxCategory.forEach((checkBoxCategory) => {
      const inputCheckBox = checkBoxCategory as HTMLInputElement;
      for (let key in isCheckedFilterCategory) {
        const keyCategory = key as keyof IsCheckedFilterCategory;
        if (inputCheckBox.id === keyCategory && isCheckedFilterCategory[keyCategory] === true) {
          inputCheckBox.checked = true;
        }
      }
    });

    itemCheckBoxBrand.forEach((checkBoxBrand) => {
      const inputCheckBox = checkBoxBrand as HTMLInputElement;
      for (let key in isCheckedFilterBrand) {
        const keyBrand = key as keyof IsCheckedFilterBrand;
        if (inputCheckBox.id === keyBrand && isCheckedFilterBrand[keyBrand] === true) {
          inputCheckBox.checked = true;
        }
      }
    });

    removeCardItem();
  }, 1000);
});
