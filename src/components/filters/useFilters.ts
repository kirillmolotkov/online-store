import {
  asideFilters,
  priceMax,
  priceMin,
  quantityOfGoodsByPriceAndStock,
  stockMax,
  stockMin,
} from './generateFilters';
import { IsCheckedFilterCategory, Data, IsCheckedFilterBrand } from '../../types/interfaces';
import { generationCardItems, sectionGoods, sendRequest } from '../generate-card/generateCardItems';
import { urlData } from './getDataForFilters';

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

const rereanderingCardItem = function () {
  while (sectionGoods?.childNodes.length !== 0) {
    sectionGoods?.firstChild?.remove();
  }
  sendRequest(urlData)
    .then((data: Array<Data>) => generationCardItems(data))
    .catch((err) => console.log(err));
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
    rereanderingCardItem();
  }

  if (target.id === 'input-min') {
    quantityOfGoodsByPriceAndStock.priceMin = Number(target.value);
    priceMin.innerText = quantityOfGoodsByPriceAndStock.priceMin.toString();
    rereanderingCardItem();
  }

  if (target.id === 'input-max') {
    quantityOfGoodsByPriceAndStock.priceMax = Number(target.value);
    priceMax.innerText = quantityOfGoodsByPriceAndStock.priceMax.toString();
    rereanderingCardItem();
  }

  if (target.id === 'input-min-stock') {
    quantityOfGoodsByPriceAndStock.stockMin = Number(target.value);
    stockMin.innerText = quantityOfGoodsByPriceAndStock.stockMin.toString();
    rereanderingCardItem();
  }

  if (target.id === 'input-max-stock') {
    quantityOfGoodsByPriceAndStock.stockMax = Number(target.value);
    stockMax.innerText = quantityOfGoodsByPriceAndStock.stockMax.toString();
    rereanderingCardItem();
  }
});
