import { sortOprionsElement, urlData } from '../../const/const';
import { Data, IIsCheckedSortOptions } from '../../types/interfaces';

import { generationCardItems, sectionGoods, sendRequest } from '../generate-card/generateCardItems';
import { generationStringRouting } from '../routing/routing';
import { changeSizeItems } from './changeSizeItems';

export const isCheckedSortOptions: IIsCheckedSortOptions = {
  pricemin: false,
  pricemax: false,
  ratingmin: false,
  ratingmax: false,
};
export const resetValueIsCheckedSortOptions = (): void => {
  const keysSortOptions = Object.keys(isCheckedSortOptions);

  keysSortOptions.forEach((key) => {
    const keySortOptions = key as keyof IIsCheckedSortOptions;
    isCheckedSortOptions[keySortOptions] = false;
  });
};

sortOprionsElement.addEventListener('click', () => {
  const selcetOptions = sortOprionsElement.selectedOptions[0].value;

  const keysSortOptions = Object.keys(isCheckedSortOptions);

  keysSortOptions.forEach((key) => {
    const keySortOptions = key as keyof IIsCheckedSortOptions;

    if (keySortOptions === selcetOptions && isCheckedSortOptions[keySortOptions] !== true) {
      resetValueIsCheckedSortOptions();
      isCheckedSortOptions[keySortOptions] = true;
      window.location.hash = generationStringRouting();
    }
  });

  while (sectionGoods?.childNodes.length !== 1) {
    sectionGoods?.lastChild?.remove();
  }
  sendRequest(urlData)
    .then((data: Array<Data>) => {
      generationCardItems(data);
      changeSizeItems();
    })
    .catch((err) => console.log(err));
});

export function sortByPriceMin(arrayDataItems: Array<Data>): void {
  arrayDataItems.sort((a, b) => {
    if (a.price > b.price) return 1;
    if (a.price < b.price) return -1;
    return 0;
  });
}

export function sortByPriceMax(arrayDataItems: Array<Data>): void {
  arrayDataItems.sort((a, b) => {
    if (a.price < b.price) return 1;
    if (a.price > b.price) return -1;
    return 0;
  });
}

export function sortByRatingMin(arrayDataItems: Array<Data>): void {
  arrayDataItems.sort((a, b) => {
    if (a.rating > b.rating) return 1;
    if (a.rating < b.rating) return -1;
    return 0;
  });
}

export function sortByRatingMax(arrayDataItems: Array<Data>): void {
  arrayDataItems.sort((a, b) => {
    if (a.rating < b.rating) return 1;
    if (a.rating > b.rating) return -1;
    return 0;
  });
}
