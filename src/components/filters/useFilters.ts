import { IsCheckedFilterCategory, Data, IsCheckedFilterBrand, IDismantledAdrressBar } from '../../types/interfaces';
import { counterFoundItems, generationCardItems, sectionGoods, sendRequest } from '../generate-card/generateCardItems';

import {
  asideFilters,
  buttonSizeView,
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
import { changeSizeItems, statusValueButton } from '../header-main/changeSizeItems';
import { generationStringRouting } from '../routing/routing';
import { parsingAdrressBar } from '../routing/parsingAdrressBar';
import { searchValue } from '../header-main/searchProducts';
import { isCheckedSortOptions } from '../header-main/sortOptions';

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

const removeCardItem = () => {
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
    const searchProducts = document.querySelector('.search-products') as HTMLInputElement;
    const optionsElements = document.querySelectorAll('option');
    const adressBarObject = parsingAdrressBar();

    const keysAdrressBarObject = Object.keys(adressBarObject);

    keysAdrressBarObject.forEach((key) => {
      const keyAdrressBarObject = key as keyof IDismantledAdrressBar;

      if (keyAdrressBarObject === 'category') {
        const keysFilterCategory = Object.keys(isCheckedFilterCategory);
        keysFilterCategory.forEach((keyCategory) => {
          const keyFilterCategory = keyCategory as keyof IsCheckedFilterCategory;

          adressBarObject[keyAdrressBarObject].forEach((item) => {
            if (keyFilterCategory === item) {
              isCheckedFilterCategory[keyFilterCategory] = true;
            }
          });
        });
      }

      if (keyAdrressBarObject === 'brand') {
        const keysFilterBrand = Object.keys(isCheckedFilterBrand);
        keysFilterBrand.forEach((keyBrand) => {
          const keyFilterBrand = keyBrand as keyof IsCheckedFilterBrand;

          adressBarObject[keyAdrressBarObject].forEach((item) => {
            if (keyFilterBrand === item) {
              isCheckedFilterBrand[keyFilterBrand] = true;
            }
          });
        });
      }

      if (keyAdrressBarObject === 'price') {
        filterPriceMin.value = adressBarObject.price[0];
        filterPriceMinSpanElement.innerText = adressBarObject.price[0];
        quantityOfGoodsByPriceAndStock.priceMin = Number(adressBarObject.price[0]);

        filterPriceMax.value = adressBarObject.price[1];
        filterPriceMaxSpanElement.innerText = adressBarObject.price[1];
        quantityOfGoodsByPriceAndStock.priceMax = Number(adressBarObject.price[1]);
      }

      if (keyAdrressBarObject === 'stock') {
        filterStockMin.value = adressBarObject.stock[0];
        filterStockMinSpanElement.innerText = adressBarObject.stock[0];
        quantityOfGoodsByPriceAndStock.stockMin = Number(adressBarObject.stock[0]);

        filterStockMax.value = adressBarObject.stock[1];
        filterStockMaxSpanElement.innerText = adressBarObject.stock[1];
        quantityOfGoodsByPriceAndStock.stockMax = Number(adressBarObject.stock[1]);
      }

      if (keyAdrressBarObject === 'search') {
        searchValue.searchValue = adressBarObject.search[0];
        searchProducts.value = adressBarObject.search[0];
      }

      if (keyAdrressBarObject === 'sort') {
        optionsElements.forEach((optionElement) => {
          const option = optionElement as HTMLOptionElement;
          if (option.value === adressBarObject.sort[0]) {
            option.selected = true;
            isCheckedSortOptions[`${adressBarObject.sort[0]}`] = true;
          }
        });
      }

      if (keyAdrressBarObject === 'sizeview') {
        if (adressBarObject.sizeview[0] === 'max') {
          buttonSizeView.innerText = 'Size view max';
          statusValueButton.max = true;
          statusValueButton.min = false;
        }
        if (adressBarObject.sizeview[0] === 'min') {
          buttonSizeView.innerText = 'Size view min';
          statusValueButton.min = true;
          statusValueButton.max = false;
        }
      }
    });

    itemCheckBoxCategory.forEach((checkBoxCategory) => {
      const inputCheckBox = checkBoxCategory as HTMLInputElement;
      const checkboxId = checkBoxCategory.id as keyof IsCheckedFilterCategory;
      if (isCheckedFilterCategory[checkboxId]) inputCheckBox.checked = true;
    });

    itemCheckBoxBrand.forEach((checkBoxBrand) => {
      const inputCheckBox = checkBoxBrand as HTMLInputElement;
      const checkboxId = checkBoxBrand.id as keyof IsCheckedFilterBrand;
      if (isCheckedFilterBrand[checkboxId]) inputCheckBox.checked = true;
    });

    removeCardItem();
  }, 250);
});
