// const body = document.querySelector('.body') as HTMLDivElement;
// const main = document.querySelector('.main') as HTMLDivElement;
// const header = document.querySelector('.header') as HTMLDivElement;
// import { IproductItem } from '../../types/interfaces';
// import cart from '../checkout/checkout'

// function generateCart() {
//     const cartTemplate = document.querySelector('#cartLayout') as HTMLTemplateElement;
//     const cartLayout = cartTemplate.content.cloneNode(true) as HTMLDivElement;
//     const fragment: DocumentFragment = document.createDocumentFragment();
//     fragment.append(cartLayout)
//    body.replaceChild(fragment, main);
// }

// function generateCartItems() {
//   console.log(typeof Checkout)
//   const basket = cart.getBasket();
//   const itemTemplate = document.querySelector('#itemTemplate') as HTMLTemplateElement;
//   const itemLayout = itemTemplate.content.cloneNode(true) as HTMLDivElement;
//   const fragment: DocumentFragment = document.createDocumentFragment();
//   const itemList = document.querySelector('.cart__container') as HTMLOListElement;
//   const oldItems = document.querySelectorAll('.cart-item__container')
//   oldItems.forEach(item => item.remove())
//   itemList.append(fragment);

// }

// generateCart();
// generateCartItems();

// let template:string

import { CATALOGUE } from '../checkout/Cart';
import { cart } from '../checkout/checkout';



export function goToCartPage() {
  setTimeout(() => {
    generateCart();
    generateCartItems();
    const cartContainer = document.querySelector('.cart__container') as HTMLDivElement;

    cartContainer.addEventListener('click', (e) => {
      let id: string;
      const addButton = e.target as HTMLElement;
      const cartItem = ((addButton.parentNode as HTMLDivElement).parentNode as HTMLDivElement)
        .parentNode as HTMLDivElement;
      if (addButton.classList.contains('cart-item__button_add-item')) {
        id = (cartItem as HTMLDivElement).getAttribute('data-id') as string;
        if (id) {
          cart.addToCart(id);
        }
      }
  
      if (addButton.classList.contains('cart-item__button_delete-item')) {
        id = (cartItem as HTMLDivElement).getAttribute('data-id') as string;
        if (id) cart.decreaseItemAmount(id);
      }
      renderItemsCount();
      renderTotalSum();
      renderItemAmount(e);
    });
  }, 500);

 
  function generateCart(): void {
    const body = document.querySelector('.body') as HTMLElement;
    const main = document.querySelector('.main') as HTMLElement;
    const cartTemplate = document.querySelector('#cartLayout') as HTMLTemplateElement;
    const cartLayout = cartTemplate.content.cloneNode(true) as HTMLDivElement;
    const fragment: DocumentFragment = document.createDocumentFragment();
    fragment.append(cartLayout);
    body.replaceChild(fragment, main);
  }

  function generateCartItems(): void {
    const oldItems = document.querySelectorAll('.cart-item__container');
    const cartItems = cart.getBasket();

    oldItems.forEach((item) => item.remove());
 
    cartItems.forEach(item => {
      const itemTemplate = document.querySelector('#itemTemplate') as HTMLTemplateElement;
      const itemLayout = itemTemplate.content.cloneNode(true) as HTMLDivElement;
      const fragment: DocumentFragment = document.createDocumentFragment();
      const itemList = document.querySelector('.cart__container') as HTMLOListElement;
      fragment.append(itemLayout);
      const prod = CATALOGUE.get(item.id)
      if (prod) {
        const id = fragment.querySelector('.cart-item__container') as HTMLDataListElement;
        id.setAttribute('data-id', prod.id);
        const photo = fragment.querySelector('.cart-item__photo-slider') as HTMLImageElement;
        photo.src = prod.images[0];
        const brand = fragment.querySelector('.cart-item__description_brand') as HTMLDivElement;
        brand.textContent = `Brand: ${prod.brand.toString()}`;
        const category = fragment.querySelector('.cart-item__description_category') as HTMLDivElement;
        category.textContent = `Category: ${prod.category.toString()}`;
        const discount =fragment.querySelector('.cart-item__description_discount') as HTMLDivElement;
        discount.textContent = `Discount: ${prod.discountPercentage.toString()}`;
        const rating = fragment.querySelector('.cart-item__description_rating') as HTMLDivElement;
        rating.textContent = `Rating: ${prod.rating.toString()}`;
        const stock = fragment.querySelector('.cart-item__in-stock') as HTMLDivElement;
        stock.textContent = `in stock: ${prod.stock.toString()}`;
        const sum = fragment.querySelector('.cart-item__price') as HTMLDivElement;
        sum.textContent = `$ ${(prod.price * item.amount) .toString()}`;
        const amount = fragment.querySelector('.cart-item__input_add-item') as HTMLInputElement;
        amount.value = `${item.amount.toString()}`;
      }
      itemList.append(fragment);
    })
  
  }
  function renderItemsCount(): void {
    const cartItems = document.querySelector('.basket__items-in-cart') as HTMLDivElement;
    let counter = cart.getItemsCount();
    if (counter > 0) {
      cartItems.classList.add('active');
    } else cartItems.classList.remove('active');
    cartItems.textContent = counter.toString();
  }

  function renderTotalSum(): void {
    const cartItems = document.querySelector('.header__total') as HTMLDivElement;
    let counter = cart.getTotalSum();
    if (counter > 0) {
      cartItems.classList.add('active');
    }
    cartItems.textContent = `You have to pay: ${counter.toString()}\$`;
  }

  function renderItemAmount(e: Event) {
    let container = document.querySelector('.cart__container');
    if (e.target === container) return;
    const item = (e.target as HTMLElement).closest('.cart-item__container') as HTMLDivElement;
    console.log(e.target);
    const id = (item as HTMLDivElement).getAttribute('data-id') as string;
    const input = item.querySelector('.cart-item__input_add-item') as HTMLInputElement;
    console.log(input);
    let amount = cart.getItemAmount(id);
    if (amount) input.value = amount.toString();
  }
}

export default goToCartPage;
