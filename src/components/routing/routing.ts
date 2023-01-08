import { IsCheckedFilterBrand, IsCheckedFilterCategory, QuantityOfGoodsByPriceAndStock } from '../../types/interfaces';
import { quantityOfGoodsByPriceAndStock } from '../filters/generateFilters';
import { isCheckedFilterBrand, isCheckedFilterCategory } from '../filters/useFilters';
import { searchValue } from '../header-main/searchProducts';

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
  const routPrice = routingForPriceFilter(quantityOfGoodsByPriceAndStock);
  const routStock = routingForStockFilter(quantityOfGoodsByPriceAndStock);
  const routSearch = routingCearchProducts(searchValue.value);

  let result: Array<string> = [];
  if (routCategory.length !== 0) result.push(routCategory);
  if (routBrand.length !== 0) result.push(routBrand);
  if (routPrice.length !== 0) result.push(routPrice);
  if (routStock.length !== 0) result.push(routStock);
  if (routSearch.length !== 0) result.push(routSearch);

  return result.join('&');
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

const routingForPriceFilter = function (quantityPrice: QuantityOfGoodsByPriceAndStock) {
  if (quantityPrice.priceMin === 50 && quantityPrice.priceMax === 1650) {
    return '';
  } else {
    return `price=${quantityPrice.priceMin}-${quantityPrice.priceMax}`;
  }
};

const routingForStockFilter = function (quantityStock: QuantityOfGoodsByPriceAndStock) {
  if (quantityStock.stockMin === 5 && quantityStock.stockMax === 120) {
    return '';
  } else {
    return `stock=${quantityStock.stockMin}-${quantityStock.stockMax}`;
  }
};

const routingCearchProducts = function (searchValue: string) {
  if (searchValue === '') {
    return '';
  } else {
    return `search=${searchValue}`;
  }
};
export const isOnlyOneTrue = function (obj: IsCheckedFilterCategory | IsCheckedFilterBrand) {
  const arr = Object.values(obj);
  return arr.filter((elem) => elem === true).length === 1;
};

export const isEveryFalse = function (obj: IsCheckedFilterCategory | IsCheckedFilterBrand) {
  return Object.values(obj).every((elem) => elem === false);
};
