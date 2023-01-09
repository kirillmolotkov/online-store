import {
  IIsCheckedSortOptions,
  IsCheckedFilterBrand,
  IsCheckedFilterCategory,
  IStatusValueButton,
  QuantityOfGoodsByPriceAndStock,
} from '../../types/interfaces';
import { quantityOfGoodsByPriceAndStock } from '../filters/generateFilters';
import { isCheckedFilterBrand, isCheckedFilterCategory } from '../filters/useFilters';
import { statusValueButton } from '../header-main/changeSizeItems';
import { searchValue } from '../header-main/searchProducts';
import { isCheckedSortOptions } from '../header-main/sortOptions';

export const isOnlyOneTrue = (obj: IsCheckedFilterCategory | IsCheckedFilterBrand | IIsCheckedSortOptions) => {
  const arr = Object.values(obj);
  return arr.filter((elem) => elem === true).length === 1;
};

export const isEveryFalse = (obj: IsCheckedFilterCategory | IsCheckedFilterBrand | IIsCheckedSortOptions) => {
  return Object.values(obj).every((elem) => elem === false);
};

export const routingForCategoryFilter = (filterCategory: IsCheckedFilterCategory) => {
  let stringRouting = 'category=';
  const keysFilterCategory = Object.keys(filterCategory);

  keysFilterCategory.forEach((key) => {
    const keyFilterCategory = key as keyof IsCheckedFilterCategory;

    if (filterCategory[keyFilterCategory] && isOnlyOneTrue(filterCategory)) {
      stringRouting += `${key}`;
    }
    if (filterCategory[keyFilterCategory] && !isOnlyOneTrue(filterCategory)) {
      stringRouting += `${key}-`;
    }
  });

  if (isEveryFalse(isCheckedFilterCategory)) {
    stringRouting = '';
  }
  return stringRouting;
};

export const routingForBrandFilter = (filterBrand: IsCheckedFilterBrand) => {
  let stringRouting = 'brand=';
  const keysFilterBrand = Object.keys(filterBrand);

  keysFilterBrand.forEach((key) => {
    const keyFilterBrand = key as keyof IsCheckedFilterBrand;

    if (filterBrand[keyFilterBrand] && isOnlyOneTrue(filterBrand)) {
      stringRouting += `${key}`;
    }
    if (filterBrand[keyFilterBrand] && !isOnlyOneTrue(filterBrand)) {
      stringRouting += `${key}-`;
    }
  });

  if (isEveryFalse(isCheckedFilterBrand)) {
    stringRouting = '';
  }
  return stringRouting;
};

const routingForPriceFilter = (quantityPrice: QuantityOfGoodsByPriceAndStock) => {
  if (quantityPrice.priceMin === 50 && quantityPrice.priceMax === 1650) {
    return '';
  }
  return `price=${quantityPrice.priceMin}-${quantityPrice.priceMax}`;
};

const routingForStockFilter = (quantityStock: QuantityOfGoodsByPriceAndStock) => {
  if (quantityStock.stockMin === 5 && quantityStock.stockMax === 120) {
    return '';
  }
  return `stock=${quantityStock.stockMin}-${quantityStock.stockMax}`;
};

const routingCearchProducts = (searchValueString: string) => {
  if (searchValueString === '') {
    return '';
  }
  return `search=${searchValueString}`;
};

const routingSortOptions = (sortOptions: IIsCheckedSortOptions) => {
  const keysSortOptions = Object.keys(sortOptions);
  let result = '';
  keysSortOptions.forEach((key) => {
    if (sortOptions[key]) {
      result = `sort=${key}`;
    }
  });
  return result;
};

const routingSizeView = (statusButton: IStatusValueButton) => {
  if (statusButton.max) return `sizeview=max`;
  if (statusButton.min) return `sizeview=min`;
  return '';
};

export const generationStringRouting = () => {
  const routCategory = isOnlyOneTrue(isCheckedFilterCategory)
    ? routingForCategoryFilter(isCheckedFilterCategory)
    : routingForCategoryFilter(isCheckedFilterCategory).slice(0, -1);
  const routBrand = isOnlyOneTrue(isCheckedFilterBrand)
    ? routingForBrandFilter(isCheckedFilterBrand)
    : routingForBrandFilter(isCheckedFilterBrand).slice(0, -1);
  const routPrice = routingForPriceFilter(quantityOfGoodsByPriceAndStock);
  const routStock = routingForStockFilter(quantityOfGoodsByPriceAndStock);
  const routSearch = routingCearchProducts(searchValue.value);
  const routSort = routingSortOptions(isCheckedSortOptions);
  const routSizeView = routingSizeView(statusValueButton);

  const result: Array<string> = [];
  if (routCategory.length !== 0) result.push(routCategory);
  if (routBrand.length !== 0) result.push(routBrand);
  if (routPrice.length !== 0) result.push(routPrice);
  if (routStock.length !== 0) result.push(routStock);
  if (routSearch.length !== 0) result.push(routSearch);
  if (routSort.length !== 0) result.push(routSort);
  if (routSizeView.length !== 0) result.push(routSizeView);

  return result.join('&');
};
