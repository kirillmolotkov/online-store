import { Checkout, getCatalogue } from './Cart';
import { renderItemsCount, renderTotalSum } from '../cart/renderCart';
export const cart: Checkout = new Checkout();
cart.loadBasketFromStorage();
const goods = document.querySelector('.goods') as HTMLDivElement;

goods.addEventListener('click', (e): void => {
  let id: string;
  const addButton = e.target as HTMLElement;
  if (addButton.classList.contains('sku__button_add-to-card')) {
    id = (addButton as HTMLDivElement).getAttribute('data-id') as string;
    cart.addToCart(id);
    renderItemsCount();
    renderTotalSum();
  }
});

window.addEventListener('load', (): void => {
  getCatalogue().then(() => {
    cart.loadBasketFromStorage();
    renderItemsCount();
    renderTotalSum();
  });
});

export default Checkout;
