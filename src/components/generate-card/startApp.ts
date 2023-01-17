import { buttonSizeView, urlData } from '../../const/const';
import { Data, IDismantledAdrressBar, IsCheckedFilterBrand, IsCheckedFilterCategory } from '../../types/interfaces';
import { renderItemsCount, renderTotalSum } from '../cart/renderCart';
import { getCatalogue } from '../checkout/Cart';
import { cart } from '../checkout/checkout';
import { generationFIlters, quantityOfGoodsByPriceAndStock } from '../filters/generateFilters';
import { isCheckedFilterBrand, isCheckedFilterCategory, removeCardItem } from '../filters/useFilters';
import { statusValueButton } from '../header-main/changeSizeItems';

import { generationHeaderMain } from '../header-main/generationHeaderMain';
import { searchValue } from '../header-main/searchProducts';
import { isCheckedSortOptions } from '../header-main/sortOptions';
import { parsingAdrressBar } from '../routing/parsingAdrressBar';
import { generationCardItems, sendRequest } from './generateCardItems';

sendRequest(urlData)
  .then((data: Array<Data>) => {
    generationFIlters(data);
    generationHeaderMain();
    generationCardItems(data);
  })
  .catch((err) => console.log(err));

window.addEventListener('DOMContentLoaded', () => {
  getCatalogue().then(() => {
    cart.loadBasketFromStorage();
    renderItemsCount();
    renderTotalSum();
  });
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
