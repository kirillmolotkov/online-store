import { sortOprionsElement } from '../../const/const';
import { Data, IIsCheckedSortOptions } from '../../types/interfaces';
import { urlData } from '../filters/getDataForFilters';
import { generationCardItems, sectionGoods, sendRequest } from '../generate-card/generateCardItems';
import { changeSizeItems } from './changeSizeItems';

export const isCheckedSortOptions: IIsCheckedSortOptions = {
  pricemin: false,
  pricemax: false,
  ratingmin: false,
  ratingmax: false,
};

sortOprionsElement.addEventListener('click', () => {
  const selcetOptions = sortOprionsElement.selectedOptions[0].value;

  for (let key in isCheckedSortOptions) {
    const value = key as keyof IIsCheckedSortOptions;
    if (value === selcetOptions && isCheckedSortOptions[value] !== true) {
      resetValueIsCheckedSortOptions(isCheckedSortOptions);
      isCheckedSortOptions[value] = true;
    }
  }

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

const resetValueIsCheckedSortOptions = function (checkedOption: IIsCheckedSortOptions) {
  for (let key in isCheckedSortOptions) {
    const value = key as keyof IIsCheckedSortOptions;
    isCheckedSortOptions[value] = false;
  }
};

export const sortByPriceMin = function (arrayDataItems: Array<Data>) {
  arrayDataItems.sort(function (a, b) {
    if (a.price > b.price) return 1;
    if (a.price < b.price) return -1;
    return 0;
  });
};

export const sortByPriceMax = function (arrayDataItems: Array<Data>) {
  arrayDataItems.sort(function (a, b) {
    if (a.price < b.price) return 1;
    if (a.price > b.price) return -1;
    return 0;
  });
};

export const sortByRatingMin = function (arrayDataItems: Array<Data>) {
  arrayDataItems.sort(function (a, b) {
    if (a.price > b.price) return 1;
    if (a.price < b.price) return -1;
    return 0;
  });
};

export const sortByRatingMax = function (arrayDataItems: Array<Data>) {
  arrayDataItems.sort(function (a, b) {
    if (a.price < b.price) return 1;
    if (a.price > b.price) return -1;
    return 0;
  });
};
