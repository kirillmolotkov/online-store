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

export function sortByRatingOrPrice(arrayDataItems: Array<Data>, key: keyof Data, sort: 'min' | 'max'): void {
  if (sort === 'min') {
    arrayDataItems.sort((a, b) => {
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;
      return 0;
    });
  } else {
    arrayDataItems.sort((a, b) => {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    });
  }
}
