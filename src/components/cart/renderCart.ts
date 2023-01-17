import { getCatalogue } from '../checkout/Cart';
import { cart } from '../checkout/checkout';
import { pagination } from './paginator/pagination';
import { changeNumberOfItems } from '../cart/paginator/pagination';
import htmlGenerator from '../utils/htmlgenerator';

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
    const cartTemplate = ` 
    <main class="main wrapper">
      <section class="cart_container">
        <div class="cart">
          <h2 class="cart_heading">Products in cart</h2>
          <div class="cart__header-container">
            <div class="cart__total-items">
              <div class="cart__items-on-page">Items on page</div>
              <input class="cart__pagination" type="number" value="3" min="0" />
            </div>
            <div class="cart__page">
              <div class="cart__page-text">Page:</div>
              <div class="cart-item__button cart-item__button_arrow-left"><</div>
              <div class="cart_page-number">1</div>
              <div class="cart-item__button cart-item__button_arrow-right">></div>
            </div>
          </div>
          <ol class="cart__container"></ol>
        </div>
        <div class="cart_summary">
          <h2 class="cart__heading">Summary</h2>
          <div class="cart__number-of-products"></div>
          <div>Total: $<span class="cart__total-sum"></span></div>
          <input type="text" class="cart__promo" name="promo" id="promo" />
          <div class="cart__total-cheat">Promo for test: 'RS', 'DreamTeam'</div>
          <button class="cart-item__button cart-item__button_apply-promo" data-id="1">Apply promo</button>
          <button class="cart-item__button cart-item__button_buy-now" data-id="1">Buy Now</button>
        </div>
      </section>
    </main>`;
    htmlGenerator(cartTemplate, body, main);
  }

  function generateEmptyCart(): void {
    const oldItems = document.querySelectorAll('.cart-item__container');
    const itemList = document.querySelector('.cart__container') as HTMLOListElement;
    oldItems.forEach((item) => item.remove());
    const itemTemplate = `    <li class="empty-cart__container">
    <h2 class="empty-cart__heading">There is nothing here, yet. Please choose some goods. And pay us money ;)</h2>
    <img class="empty-cart__image" src="assets/images/empty-cart.png" alt="empty cart" />
  </li>`;
    htmlGenerator(itemTemplate, itemList);
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
