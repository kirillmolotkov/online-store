import { searchProductsElement, urlData } from '../../const/const';
import { Data } from '../../types/interfaces';

import { generationCardItems, sectionGoods, sendRequest } from '../generate-card/generateCardItems';
import { generationStringRouting } from '../routing/routing';
import { changeSizeItems } from './changeSizeItems';

export let searchValue = {
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

export const searchProductFilter = function (inputValue: string, data: Data): boolean | undefined{
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
    for (const key in valueForSearch) {
      const value = key as keyof Object;
      if (inputValue === valueForSearch[value].toString().toLowerCase().slice(0, lengthInputValue)) {
        return true;
      }
    }
  } else {
    return true;
  }
};
