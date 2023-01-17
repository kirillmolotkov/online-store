import PaginationHelper from './Paginator';
import { cart } from '../../checkout/checkout';
import IbasketItem from '../../../types/interfaces';
import { CATALOGUE } from '../../checkout/Cart';
import htmlGenerator from '../../utils/htmlgenerator';

function generateProductItem(item: IbasketItem) {
  const itemList = document.querySelector('.cart__container') as HTMLOListElement;
  const product = CATALOGUE.get(item.id);
  if (product) {
    const itemTemplate = `
    <li class="cart-item__container" data-id="${product.id}">
    <img class="cart-item__photo-slider" src="${product.images[0]}" />
    <div class="cart-item__info">
      <h3 class="cart-item__name">${product.title.toString()}</h3>
      <span class="cart-item__description_brand">Brand: ${product.brand.toString()}</span>
      <span class="cart-item__description_category">Category: ${product.category.toString()}</span>
      <span class="cart-item__description_discount">Discount: ${product.discountPercentage.toString()}</span>
      <span class="cart-item__description_rating">Rating: ${product.rating.toString()}</span>
    </div>
    <div class="cart-item__num-block">
      <div class="cart-item__in-stock">in stock: ${product.stock.toString()}</div>
      <div class="cart__add-del-block">
        <button class="cart-item__button cart-item__button_add-item" data-id="1">+</button>
        <div class="cart-item__input_add-item" data-id="1">${item.amount.toString()}</div>
        <button class="cart-item__button cart-item__button_delete-item" data-id="1">-</button>
      </div>
      <div class="cart-item__price">$ ${(product.price * item.amount).toString()}</div>
    </div>
  </li>
  `;
    htmlGenerator(itemTemplate, itemList);
  }
}

function generateCartItems(_itemOnPage: number, _PageIndex: number): void {
  const oldItems = document.querySelectorAll('.cart-item__container');
  const cartItems = cart.getBasket();
  const startItem = _PageIndex * _itemOnPage - _itemOnPage;
  const lastItem = startItem + _itemOnPage;
  const itemsToGenerate: IbasketItem[] = cartItems.slice(startItem, lastItem);
  oldItems.forEach((item) => item.remove());
  itemsToGenerate.forEach((item) => generateProductItem(item));
}

let nextPage: HTMLDivElement;
let prevPage: HTMLDivElement;
let itemsOnPage: number;
let paginationH: PaginationHelper;

function goPrevPage(): void {
  if (Number(pageIndex.textContent) > 1) {
    pageIndex.textContent = (Number(pageIndex.textContent) - 1).toString();
    generateCartItems(itemsOnPage, Number(pageIndex.textContent));
  }
  if (Number(pageIndex.textContent) === 1) {
    prevPage.classList.add('disactivated');
  }
  if (Number(pageIndex.textContent) < paginationH.pageCount()) {
    nextPage.classList.remove('disactivated');
  }
  localStorage.setItem('currentCartPage', Number(pageIndex.textContent).toString());
}
let pageIndex: HTMLDivElement;

function goNextPage(): void {
  if (Number(pageIndex.textContent) < paginationH.pageCount()) {
    nextPage.classList.remove('disactivated');
    pageIndex.textContent = (1 + Number(pageIndex.textContent)).toString();
    generateCartItems(itemsOnPage, Number(pageIndex.textContent));
  }
  if (Number(pageIndex.textContent) === paginationH.pageCount()) {
    nextPage.classList.add('disactivated');
  }
  if (Number(pageIndex.textContent) === 2) {
    prevPage.classList.remove('disactivated');
  }
  if (Number(pageIndex.textContent) > paginationH.pageCount()) {
    pageIndex.textContent = paginationH.pageCount().toString();
  }

  localStorage.setItem('currentCartPage', Number(pageIndex.textContent).toString());
}

let items: HTMLInputElement;

export function updatePagination(): void {
  items = document.querySelector('.cart__pagination') as HTMLInputElement;
  if (Number(items.value) < 1) {
    items.value = '1';
  }
  itemsOnPage = Number(items.value);

  if (Number(pageIndex.textContent) <= 0) {
    pageIndex.textContent = '1';
  }
  if (Number(pageIndex.textContent) > paginationH.pageCount()) {
    pageIndex.textContent = paginationH.pageCount().toString();
    localStorage.setItem('currentCartPage', Number(pageIndex.textContent).toString());
  }
  generateCartItems(itemsOnPage, Number(pageIndex.textContent));
}

export function pagination(): void {
  nextPage = document.querySelector('.cart-item__button_arrow-right') as HTMLDivElement;
  prevPage = document.querySelector('.cart-item__button_arrow-left') as HTMLDivElement;
  pageIndex = document.querySelector('.cart_page-number') as HTMLDivElement;
  items = document.querySelector('.cart__pagination') as HTMLInputElement;
  const cachedItemsOnPage = localStorage.getItem('itemsOnPage');
  if (cachedItemsOnPage) {
    items.value = cachedItemsOnPage;
  }
  itemsOnPage = Number(items.value);
  const cachedCurrentPage = localStorage.getItem('currentCartPage');
  if (cachedCurrentPage !== '0') {
    pageIndex.textContent = cachedCurrentPage;
  }
  nextPage.addEventListener('click', goNextPage);
  prevPage.addEventListener('click', goPrevPage);
  // items.addEventListener('input', changeNumberOfItems);
  paginationH = new PaginationHelper(cart.getBasket(), itemsOnPage);
  updatePagination();
}

export function changeNumberOfItems(): void {
  itemsOnPage = Number(items.value);
  items.value = itemsOnPage.toString();
  localStorage.setItem('itemsOnPage', itemsOnPage.toString());
  pagination();
}
