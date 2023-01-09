import {
  Data,
  IsCheckedFilterBrand,
  IsCheckedFilterCategory,
  QuantityOfGoodsByPriceAndStock,
} from '../../types/interfaces';
import { TempalateForCardItem } from '../../types/interfaces';
import { quantityOfGoodsByPriceAndStock } from '../filters/generateFilters';
import { isCheckedFilterBrand, isCheckedFilterCategory } from '../filters/useFilters';
import { generationFoundElement } from '../header-main/generationHeaderMain';
import { searchProductFilter, searchValue } from '../header-main/searchProducts';
import {
  isCheckedSortOptions,
  sortByPriceMax,
  sortByPriceMin,
  sortByRatingMax,
  sortByRatingMin,
} from '../header-main/sortOptions';

export const sectionGoods = document.querySelector('.goods');
export let counterFoundItems = 0;
export let arrayDataItems: Array<Data> = [];

export async function sendRequest(url: string) {
  return fetch(url).then((response) => {
    return response.json();
  });
}

const generateHTML = (products: Data): void => {
  const template: TempalateForCardItem = {
    container: document.createElement('div'),
    title: document.createElement('h3'),
    image: document.createElement('img'),
    info: document.createElement('div'),
    description: {
      category: document.createElement('span'),
      brand: document.createElement('span'),
      discount: document.createElement('span'),
      rating: document.createElement('span'),
      stock: document.createElement('span'),
    },
    buttonAddToCart: document.createElement('button'),
    buttonDetails: document.createElement('button'),
    price: document.createElement('span'),
  };

  template.container.className = 'sku__container';

  template.title.className = 'sku__name';
  template.title.innerText = products.title;

  template.image.className = 'sku__photo-slider';
  template.image.src = products.thumbnail;

  template.info.className = 'sku__info';

  template.description.brand.className = 'sku__description_brand';
  template.description.brand.innerText = `Brand: ${products.brand}`;

  template.description.category.className = 'sku__description_category';
  template.description.category.innerText = `Catagory: ${products.category}`;

  template.description.discount.className = 'sku__description_discount';
  template.description.discount.innerText = `Discount: ${products.discountPercentage} %`;

  template.description.rating.className = 'sku__description_rating';
  template.description.rating.innerText = `Rating: ${products.rating}`;

  template.description.stock.className = 'sku__description_stock';
  template.description.stock.innerText = `Stock: ${products.stock}`;

  template.buttonAddToCart.className = 'sku__button_add-to-card';
  template.buttonAddToCart.innerText = 'Add to cart';
  template.buttonAddToCart.dataset.id = products.id;

  template.buttonDetails.className = 'sku__button_details';
  template.buttonDetails.innerText = 'Details';
  template.buttonDetails.dataset.id = products.id;

  template.price.className = 'sku__price';
  template.price.innerHTML = `$ ${products.price}`;

  template.info.append(
    template.description.brand,
    template.description.category,
    template.description.discount,
    template.description.rating,
    template.description.stock
  );

  template.container.append(
    template.title,
    template.image,
    template.info,
    template.buttonAddToCart,
    template.buttonDetails,
    template.price
  );

  if (sectionGoods) sectionGoods.append(template.container);
};

const checkForMatchingFilterAndData = (
  filterCategory: IsCheckedFilterCategory,
  filterBrand: IsCheckedFilterBrand,
  quantityFilter: QuantityOfGoodsByPriceAndStock,
  dataItem: Data
): void => {
  if (
    Object.values(filterCategory).every((elem) => elem === false) &&
    Object.values(filterBrand).every((elem) => elem === false)
  ) {
    if (
      quantityFilter.priceMin <= dataItem.price &&
      quantityFilter.priceMax >= dataItem.price &&
      quantityFilter.stockMin <= dataItem.stock &&
      quantityFilter.stockMax >= dataItem.stock
    ) {
      if (searchProductFilter(searchValue.value, dataItem)) {
        arrayDataItems.push(dataItem);
        counterFoundItems += 1;
      }
    }
  }

  const keysFiterCategory = Object.keys(filterCategory);

  keysFiterCategory.forEach((key) => {
    const keyFilterCategory = key as keyof IsCheckedFilterCategory;

    if (filterCategory[keyFilterCategory] && Object.values(filterBrand).every((elem) => elem === false)) {
      if (
        keyFilterCategory === dataItem.category &&
        quantityFilter.priceMin <= dataItem.price &&
        quantityFilter.priceMax >= dataItem.price &&
        quantityFilter.stockMin <= dataItem.stock &&
        quantityFilter.stockMax >= dataItem.stock
      ) {
        if (searchProductFilter(searchValue.value, dataItem)) {
          arrayDataItems.push(dataItem);
          counterFoundItems += 1;
        }
      }
    }
  });

  const keysFilterBrand = Object.keys(filterBrand);

  keysFilterBrand.forEach((key) => {
    const keyFilterBrand = key as keyof IsCheckedFilterBrand;

    if (filterBrand[keyFilterBrand] && Object.values(filterCategory).every((elem) => elem === false)) {
      if (
        keyFilterBrand === dataItem.brand.toLowerCase() &&
        quantityFilter.priceMin <= dataItem.price &&
        quantityFilter.priceMax >= dataItem.price &&
        quantityFilter.stockMin <= dataItem.stock &&
        quantityFilter.stockMax >= dataItem.stock
      ) {
        if (searchProductFilter(searchValue.value, dataItem)) {
          arrayDataItems.push(dataItem);
          counterFoundItems += 1;
        }
      }
    }
  });

  keysFiterCategory.forEach((keyCategory) => {
    const keyFilterCategory = keyCategory as keyof IsCheckedFilterCategory;
    if (filterCategory[keyFilterCategory]) {
      keysFilterBrand.forEach((keyBrand) => {
        const keyFilterBrand = keyBrand as keyof IsCheckedFilterBrand;
        if (filterBrand[keyFilterBrand]) {
          if (
            keyFilterCategory === dataItem.category &&
            keyFilterBrand === dataItem.brand.toLowerCase() &&
            quantityFilter.priceMin <= dataItem.price &&
            quantityFilter.priceMax >= dataItem.price &&
            quantityFilter.stockMin <= dataItem.stock &&
            quantityFilter.stockMax >= dataItem.stock
          ) {
            if (searchProductFilter(searchValue.value, dataItem)) {
              arrayDataItems.push(dataItem);
              counterFoundItems += 1;
            }
          }
        }
      });
    }
  });
};

export function generationCardItems(data: Array<Data>) {
  data.forEach((elem) => {
    checkForMatchingFilterAndData(isCheckedFilterCategory, isCheckedFilterBrand, quantityOfGoodsByPriceAndStock, elem);
  });

  if (isCheckedSortOptions.pricemin === true) sortByPriceMin(arrayDataItems);
  if (isCheckedSortOptions.pricemax === true) sortByPriceMax(arrayDataItems);
  if (isCheckedSortOptions.ratingmin === true) sortByRatingMin(arrayDataItems);
  if (isCheckedSortOptions.ratingmax === true) sortByRatingMax(arrayDataItems);

  arrayDataItems.forEach((dataItem) => {
    generateHTML(dataItem);
  });

  generationFoundElement(counterFoundItems);
  counterFoundItems = 0;
  arrayDataItems = [];
}
