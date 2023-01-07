import { getCatalogue } from '../checkout/Cart';
import { cart } from '../checkout/checkout';
import { pagination } from './paginator/pagination';
import { changeNumberOfItems } from '../cart/paginator/pagination';

export function renderItemsCount(): void {
  const cartItems = document.querySelector('.basket__items-in-cart') as HTMLDivElement;
  const summaryAmount = document.querySelector('.cart__number-of-products') as HTMLDivElement;
  const summarySum = document.querySelector('.cart__total-sum') as HTMLDivElement;

  const counter = cart.getItemsCount();
  if (counter > 0) {
    cartItems.classList.add('active');
  } else cartItems.classList.remove('active');
  cartItems.textContent = counter.toString();
  if (summaryAmount) summaryAmount.textContent = `Products: ${counter.toString()}`;
  if (summarySum) summarySum.textContent = `${cart.getTotalSum().toString()}`;
}

export function renderTotalSum(): void {
  const cartItems = document.querySelector('.header__total') as HTMLDivElement;
  const counter = cart.getTotalSum();
  if (counter > 0) {
    cartItems.classList.add('active');
  } else cartItems.classList.remove('active');
  cartItems.textContent = `You have to pay: ${counter.toString()}$`;
}
export function goToCartPage(): void {
  function generateCart(): void {
    const body = document.querySelector('.body') as HTMLElement;
    const main = document.querySelector('.main') as HTMLElement;
    const cartTemplate = document.querySelector('#cartLayout') as HTMLTemplateElement;
    const cartLayout = cartTemplate.content.cloneNode(true) as HTMLDivElement;
    const fragment: DocumentFragment = document.createDocumentFragment();
    fragment.append(cartLayout);
    body.replaceChild(fragment, main);
  }

  function generateEmptyCart(): void {
    const oldItems = document.querySelectorAll('.cart-item__container');
    oldItems.forEach((item) => item.remove());

    const itemTemplate = document.querySelector('#emptyCart') as HTMLTemplateElement;
    const itemLayout = itemTemplate.content.cloneNode(true) as HTMLDivElement;
    const fragment: DocumentFragment = document.createDocumentFragment();
    const itemList = document.querySelector('.cart__container') as HTMLOListElement;
    fragment.append(itemLayout);
    itemList.append(fragment);
  }

  function renderItemAmountSum(e: Event): void {
    const container = document.querySelector('.cart__container') as HTMLDivElement;
    if (e.target === container) return;
    const item = (e.target as HTMLElement).closest('.cart-item__container') as HTMLDivElement;
    const sum = item.querySelector('.cart-item__price') as HTMLDivElement;
    const id = (item as HTMLDivElement).getAttribute('data-id') as string;
    const input = item.querySelector('.cart-item__input_add-item') as HTMLDivElement;
    const currentSum = cart.getItemSum(id);
    const amount = cart.getItemAmount(id);
    if (amount && currentSum) {
      input.textContent = amount.toString();
      sum.textContent = `$ ${currentSum.toString()}`;
    }
  }
  getCatalogue().then(() => {
    generateCart();
    if (cart.getItemsCount()) {
      pagination();
      const items = document.querySelector('.cart__pagination') as HTMLInputElement;
      items.addEventListener('input', changeNumberOfItems);
      const cartContainer = document.querySelector('.cart__container') as HTMLDivElement;
      cartContainer.addEventListener('click', (e) => {
        const addButton = e.target as HTMLElement;
        const cartItem = ((addButton.parentNode as HTMLDivElement).parentNode as HTMLDivElement)
          .parentNode as HTMLDivElement;
        const id: string = (cartItem as HTMLDivElement).getAttribute('data-id') as string;

        if (id) {
          if (addButton.classList.contains('cart-item__button_add-item')) {
            cart.addToCart(id);
          }
          if (addButton.classList.contains('cart-item__button_delete-item')) {
            cart.decreaseItemAmount(id);
            if (!cart.getItemAmount(id)) {
              cartItem.style.opacity = '0';
              setTimeout(() => {
                cartItem.remove();
                pagination();
              }, 300);
              if (!cart.getItemsCount()) {
                generateEmptyCart();
              }
            }
          }

          renderItemAmountSum(e);
          renderItemsCount();
          renderTotalSum();
        }
      });
    } else generateEmptyCart();
    renderItemsCount();
    renderTotalSum();
  });
}
export default goToCartPage;
