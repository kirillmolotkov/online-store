import { searchProductsElement } from '../../const/const';
import { Data } from '../../types/interfaces';
import { urlData } from '../filters/getDataForFilters';
import { generationCardItems, sectionGoods, sendRequest } from '../generate-card/generateCardItems';

export let searchValue = '';

searchProductsElement.addEventListener('input', () => {
  searchValue = searchProductsElement.value;
  while (sectionGoods?.childNodes.length !== 1) {
    sectionGoods?.lastChild?.remove();
  }

  sendRequest(urlData)
    .then((data: Array<Data>) => {
      generationCardItems(data);
    })
    .catch((err) => console.log(err));
});

export const searchProductFilter = function (inputValue: string, data: Data) {
  let lengthInputValue = inputValue.length;
  const valueForSearch = {
    title: data.title,
    price: data.price,
    rating: data.rating,
    stock: data.stock,
    brand: data.brand,
    category: data.category,
  };

  if (inputValue !== '') {
    for (let key in valueForSearch) {
      const value = key as keyof Object;
      if (inputValue === valueForSearch[value].toString().toLowerCase().slice(0, lengthInputValue)) {
        return true;
      }
    }
  } else {
    return true;
  }
};
