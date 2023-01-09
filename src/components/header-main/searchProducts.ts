import { searchProductsElement, urlData } from '../../const/const';
import { Data } from '../../types/interfaces';

import { generationCardItems, sectionGoods, sendRequest } from '../generate-card/generateCardItems';
import { generationStringRouting } from '../routing/routing';
import { changeSizeItems } from './changeSizeItems';

export const searchValue = {
  value: '',
  get searchValue() {
    return this.value;
  },
  set searchValue(value) {
    this.value = value;
  },
};

searchProductsElement.addEventListener('input', () => {
  searchValue.value = searchProductsElement.value;
  while (sectionGoods?.childNodes.length !== 1) {
    sectionGoods?.lastChild?.remove();
  }
  window.location.hash = generationStringRouting();
  sendRequest(urlData)
    .then((data: Array<Data>) => {
      generationCardItems(data);
      changeSizeItems();
    })
    .catch((err) => console.log(err));
});

interface IValueForSearch {
  title: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
}
export const searchProductFilter = (inputValue: string, data: Data): boolean => {
  let result = false;
  const lengthInputValue = inputValue.length;
  const valueForSearch = {
    title: data.title,
    price: data.price,
    rating: data.rating,
    stock: data.stock,
    brand: data.brand,
    category: data.category,
  };

  if (inputValue !== '') {
    const keysValueForSearch = Object.keys(valueForSearch);

    keysValueForSearch.forEach((key) => {
      const keyVlaueForSearch = key as keyof IValueForSearch;
      if (inputValue === valueForSearch[keyVlaueForSearch].toString().toLowerCase().slice(0, lengthInputValue)) {
        result = true;
      }
    });
  } else {
    result = true;
  }
  return result;
};
