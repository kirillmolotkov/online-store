import { IbasketItem, IproductItem } from '../../types/interfaces';
import { Checkout } from './Cart';
import {} from './Cart';

const cart: Checkout = new Checkout();

const goods = document.querySelector('.goods') as HTMLDivElement;

goods.addEventListener('click', (e) => {
  let id: string;
  const addButton = e.target as HTMLElement;
  if (addButton.classList.contains('sku__button_add-to-card')) {
    id = (addButton as HTMLDivElement).getAttribute('data-id') as string;
    cart.addToCart(id);
    renderItemsCount();
    renderTotalSum();
  }
});

function renderItemsCount(): void {
  const cartItems = document.querySelector('.basket__items-in-cart') as HTMLDivElement;
  let counter = cart.getItemsCount();
  if (counter > 0) {
    cartItems.classList.add('active');
  } else cartItems.classList.remove('active')
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
  if (e.target === container) return
  const item = (e.target as HTMLElement).closest('.cart-item__container') as HTMLDivElement;
  console.log(e.target)
  const id = (item as HTMLDivElement).getAttribute('data-id') as string;
  const input = item.querySelector('.cart-item__input_add-item') as HTMLInputElement;
  console.log(input)
  let amount = cart.getItemAmount(id);
  if (amount) input.value = amount.toString();
}

const cartContainer = document.querySelector('.cart__container') as HTMLDivElement;
cartContainer.addEventListener('click', (e) => {
  let id: string;
  const addButton = e.target as HTMLElement;
  const cartItem = ((addButton.parentNode as HTMLDivElement).parentNode as HTMLDivElement).parentNode as HTMLDivElement;
  if (addButton.classList.contains('cart-item__button_add-item')) {
    id = (cartItem as HTMLDivElement).getAttribute('data-id') as string;
    if (id) {
      cart.addToCart(id);
    }
  }

  if (addButton.classList.contains('cart-item__button_delete-item')) {
    id = (cartItem as HTMLDivElement).getAttribute('data-id') as string;
    if (id) cart.decreaseItemAmount(id)
  }
  renderItemsCount();
  renderTotalSum();
  renderItemAmount(e)
});

export default Checkout;
