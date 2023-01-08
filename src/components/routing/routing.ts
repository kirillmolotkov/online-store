import { IsCheckedFilterBrand, IsCheckedFilterCategory } from '../../types/interfaces';
import { isCheckedFilterBrand, isCheckedFilterCategory } from '../filters/useFilters';

window.addEventListener('hashchange', () => {
  // console.log(window.location.hash);
});

export const generationStringRouting = function () {
  const routCategory = isOnlyOneTrue(isCheckedFilterCategory)
    ? routingForCategoryFilter(isCheckedFilterCategory)
    : routingForCategoryFilter(isCheckedFilterCategory).slice(0, -1);
  const routBrand = isOnlyOneTrue(isCheckedFilterBrand)
    ? routingForBrandFilter(isCheckedFilterBrand)
    : routingForBrandFilter(isCheckedFilterBrand).slice(0, -1);
  let resutl = '';

  if (routCategory.length === 0) resutl = `${routBrand}`;
  if (routBrand.length === 0) resutl = `${routCategory}`;
  if (routBrand.length !== 0 && routCategory.length !== 0) resutl = `${routCategory}&${routBrand}`;
  return resutl;
};

export const routingForCategoryFilter = function (filterCategory: IsCheckedFilterCategory) {
  let stringRouting = 'category=';
  for (let key in isCheckedFilterCategory) {
    const value = key as keyof IsCheckedFilterCategory;
    if (isCheckedFilterCategory[value] && isOnlyOneTrue(filterCategory)) {
      stringRouting += `${value}`;
    }
    if (isCheckedFilterCategory[value] && !isOnlyOneTrue(filterCategory)) {
      stringRouting += `${value}-`;
    }
  }
  if (isEveryFalse(isCheckedFilterCategory)) {
    stringRouting = '';
  } else {
    stringRouting = stringRouting;
  }
  return stringRouting;
};

export const routingForBrandFilter = function (filterBrand: IsCheckedFilterBrand) {
  let stringRouting = 'brand=';
  for (let key in isCheckedFilterBrand) {
    const value = key as keyof IsCheckedFilterBrand;
    if (isCheckedFilterBrand[value] && isOnlyOneTrue(filterBrand)) {
      stringRouting += `${value}`;
    }
    if (isCheckedFilterBrand[value] && !isOnlyOneTrue(filterBrand)) {
      stringRouting += `${value}-`;
    }
  }
  if (isEveryFalse(isCheckedFilterBrand)) {
    stringRouting = '';
  } else {
    stringRouting = stringRouting;
  }
  return stringRouting;
};

export const routingForPriceFilter = function () {};

export const isOnlyOneTrue = function (obj: IsCheckedFilterCategory | IsCheckedFilterBrand) {
  const arr = Object.values(obj);
  return arr.filter((elem) => elem === true).length === 1;
};

export const isEveryFalse = function (obj: IsCheckedFilterCategory | IsCheckedFilterBrand) {
  return Object.values(obj).every((elem) => elem === false);
};
