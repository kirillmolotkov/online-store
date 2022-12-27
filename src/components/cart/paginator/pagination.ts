import PaginationHelper from './Paginator';
import { cart } from '../../checkout/checkout';
import IbasketItem from '../../../types/interfaces';
import { CATALOGUE, getCatalogue } from '../../checkout/Cart';

export function pagination(): void {
  const cartPage = document.querySelector('.cart_container') as HTMLDivElement;
  const items = document.querySelector('.cart__pagination') as HTMLInputElement;
  let pageIndex = document.querySelector('.cart_page-number') as HTMLDivElement;

  let cachedItemsOnPage = localStorage.getItem('itemsOnPage');
  if (cachedItemsOnPage) items.value = cachedItemsOnPage;
  let cachedCurrentPage = localStorage.getItem('currentCartPage');
  if (cachedCurrentPage) pageIndex.textContent = cachedCurrentPage;
  updatePagination();
  console.log('hi');
}

export function updatePagination() {
  const items = document.querySelector('.cart__pagination') as HTMLInputElement;
  let itemsOnPage: number = Number(items.value);
  let pageIndex = document.querySelector('.cart_page-number') as HTMLDivElement;
  let paginationH: PaginationHelper = new PaginationHelper(cart.getBasket(), itemsOnPage);
  const nextPage = document.querySelector('.cart-item__button_arrow-right') as HTMLDivElement;
  const prevPage = document.querySelector('.cart-item__button_arrow-left') as HTMLDivElement;

  if (Number(pageIndex.textContent) > paginationH.pageCount()) {
    console.log(Number(pageIndex.textContent));
    console.log(paginationH.pageCount());
    pageIndex.textContent = paginationH.pageCount().toString();
    localStorage.setItem('currentCartPage', Number(pageIndex.textContent).toString());
    pagination();
  }

  function goNextPage(): void {
    console.log(Number(pageIndex.textContent));
    console.log(paginationH.pageCount());
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
    if (Number(pageIndex.textContent) > paginationH.pageCount())
      pageIndex.textContent = paginationH.pageCount().toString();
    console.log(paginationH.pageCount());
    localStorage.setItem('currentCartPage', Number(pageIndex.textContent).toString());
  }

  function goPrevPage(): void {
    console.log(Number(pageIndex.textContent));
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
    // if (Number(pageIndex.textContent) < paginationH.pageCount()) {
    //   nextPage.classList.remove('disactivated');
    //   nextPage.addEventListener('click', goNextPage);
    // }
    localStorage.setItem('currentCartPage', Number(pageIndex.textContent).toString());
  }
  nextPage.addEventListener('click', goNextPage);
  prevPage.addEventListener('click', goPrevPage);

  items.addEventListener('input', () => {
    itemsOnPage = Number(items.value);
    items.value = itemsOnPage.toString();
    localStorage.setItem('itemsOnPage', itemsOnPage.toString());
    paginationH = new PaginationHelper(cart.getBasket(), itemsOnPage);
    pagination();
  });

  generateCartItems(itemsOnPage, Number(pageIndex.textContent));
}

function generateCartItems(itemsOnPage: number, pageIndex: number): void {
  const oldItems = document.querySelectorAll('.cart-item__container');
  const cartItems = cart.getBasket();
  const startItem = pageIndex * itemsOnPage - itemsOnPage;
  const lastItem = startItem + itemsOnPage;
  let itemsToGenerate: IbasketItem[] = cartItems.slice(startItem, lastItem);
  oldItems.forEach((item) => item.remove());
  itemsToGenerate.forEach((item) => {
    const itemTemplate = document.querySelector('#itemTemplate') as HTMLTemplateElement;
    const itemLayout = itemTemplate.content.cloneNode(true) as HTMLDivElement;
    const fragment: DocumentFragment = document.createDocumentFragment();
    const itemList = document.querySelector('.cart__container') as HTMLOListElement;
    fragment.append(itemLayout);
    const prod = CATALOGUE.get(item.id);
    if (prod) {
      const id = fragment.querySelector('.cart-item__container') as HTMLDataListElement;
      id.setAttribute('data-id', prod.id);
      const photo = fragment.querySelector('.cart-item__photo-slider') as HTMLImageElement;
      photo.src = prod.images[0];
      const brand = fragment.querySelector('.cart-item__description_brand') as HTMLDivElement;
      brand.textContent = `Brand: ${prod.brand.toString()}`;
      const category = fragment.querySelector('.cart-item__description_category') as HTMLDivElement;
      category.textContent = `Category: ${prod.category.toString()}`;
      const discount = fragment.querySelector('.cart-item__description_discount') as HTMLDivElement;
      discount.textContent = `Discount: ${prod.discountPercentage.toString()}`;
      const rating = fragment.querySelector('.cart-item__description_rating') as HTMLDivElement;
      rating.textContent = `Rating: ${prod.rating.toString()}`;
      const stock = fragment.querySelector('.cart-item__in-stock') as HTMLDivElement;
      stock.textContent = `in stock: ${prod.stock.toString()}`;
      const sum = fragment.querySelector('.cart-item__price') as HTMLDivElement;
      sum.textContent = `$ ${(prod.price * item.amount).toString()}`;
      const amount = fragment.querySelector('.cart-item__input_add-item') as HTMLDivElement;
      amount.textContent = `${item.amount.toString()}`;
    }
    itemList.append(fragment);
  });
}
