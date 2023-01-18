import { getCatalogue } from '../checkout/Cart';
import { cart } from '../checkout/checkout';
import { pagination } from './paginator/pagination';
import { changeNumberOfItems } from '../cart/paginator/pagination';
import htmlGenerator from '../utils/htmlgenerator';

function addRemoveStyle(count: number, element: HTMLElement) {
  if (count > 0) {
    element.classList.add('active');
  } else element.classList.remove('active');
}

export function renderItemsCount(): void {
  const CART_ITEMS = document.querySelector('.basket__items-in-cart') as HTMLDivElement;
  const SUMMARY_AMOUNT = document.querySelector('.cart__number-of-products') as HTMLDivElement;
  const SUMMARY_SUM = document.querySelector('.cart__total-sum') as HTMLDivElement;
  const COUNTER = cart.getItemsCount();
  addRemoveStyle(COUNTER, CART_ITEMS);
  CART_ITEMS.textContent = COUNTER.toString();
  if (SUMMARY_AMOUNT) SUMMARY_AMOUNT.textContent = `Products: ${COUNTER.toString()}`;
  if (SUMMARY_SUM) SUMMARY_SUM.textContent = `${cart.getTotalSum().toString()}`;
}

export function renderTotalSum(): void {
  const CART_ITEMS = document.querySelector('.header__total') as HTMLDivElement;
  const COUNTER = cart.getTotalSum();
  addRemoveStyle(COUNTER, CART_ITEMS);
  CART_ITEMS.textContent = `You have to pay: ${COUNTER.toString()}$`;
}

export function goToCartPage(): void {
  function generateCart(): void {
    const BODY = document.querySelector('.body') as HTMLElement;
    const MAIN = document.querySelector('.main') as HTMLElement;
    const CART_TEMPLATE = ` 
    <main class="main wrapper">
      <section class="cart_container">
        <div class="cart">
          <h2 class="cart_heading">Products in cart</h2>
          <div class="cart__header-container">
            <div class="cart__total-ITEMS">
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
    htmlGenerator(CART_TEMPLATE, BODY, MAIN);
  }

  function generateEmptyCart(): void {
    const OLDITEMS = document.querySelectorAll('.cart-item__container');
    const ITEMLIST = document.querySelector('.cart__container') as HTMLOListElement;
    OLDITEMS.forEach((item) => item.remove());
    const ITEMTEMPLATE = `    <li class="empty-cart__container">
    <h2 class="empty-cart__heading">There is nothing here, yet. Please choose some goods. And pay us money ;)</h2>
    <img class="empty-cart__image" src="assets/images/empty-cart.png" alt="empty cart" />
  </li>`;
    htmlGenerator(ITEMTEMPLATE, ITEMLIST);
  }

  function renderItemAmountSum(e: Event): void {
    const CONTAINER = document.querySelector('.cart__container') as HTMLDivElement;
    if (e.target === CONTAINER) return;
    const ITEM = (e.target as HTMLElement).closest('.cart-item__container') as HTMLDivElement;
    const SUM = ITEM.querySelector('.cart-item__price') as HTMLDivElement;
    const ID = (ITEM as HTMLDivElement).getAttribute('data-id') as string;
    const INPUT = ITEM.querySelector('.cart-item__input_add-item') as HTMLDivElement;
    const CURRENTSUM = cart.getItemSum(ID);
    const AMOUNT = cart.getItemAmount(ID);
    if (AMOUNT && CURRENTSUM) {
      INPUT.textContent = AMOUNT.toString();
      SUM.textContent = `$ ${CURRENTSUM.toString()}`;
    }
  }

  function handleCart(e: Event) {
    const TIME_TO_FADEOUT = 300;
    const ADD_BUTTON = e.target as HTMLElement;
    const CART_ITEM = ((ADD_BUTTON.parentNode as HTMLDivElement).parentNode as HTMLDivElement)
      .parentNode as HTMLDivElement;
    const id: string = (CART_ITEM as HTMLDivElement).getAttribute('data-id') as string;

    if (id) {
      if (ADD_BUTTON.classList.contains('cart-item__button_add-item')) {
        cart.addToCart(id);
      }
      if (ADD_BUTTON.classList.contains('cart-item__button_delete-item')) {
        cart.decreaseItemAmount(id);
        if (!cart.getItemAmount(id)) {
          CART_ITEM.style.opacity = '0';
          setTimeout(() => {
            CART_ITEM.remove();
            pagination();
          }, TIME_TO_FADEOUT);
          if (!cart.getItemsCount()) {
            generateEmptyCart();
          }
        }
      }
      renderItemAmountSum(e);
      renderItemsCount();
      renderTotalSum();
    }
  }

  getCatalogue().then(() => {
    generateCart();
    if (cart.getItemsCount()) {
      pagination();
      const ITEMS = document.querySelector('.cart__pagination') as HTMLInputElement;
      ITEMS.addEventListener('input', changeNumberOfItems);
      const CART_CONTAINER = document.querySelector('.cart__container') as HTMLDivElement;
      CART_CONTAINER.addEventListener('click', (e) => {
        handleCart(e);
      });
    } else generateEmptyCart();
    renderItemsCount();
    renderTotalSum();
  });
}
export default goToCartPage;
