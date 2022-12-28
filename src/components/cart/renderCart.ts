import { CATALOGUE, getCatalogue } from '../checkout/Cart';
import { cart } from '../checkout/checkout';
import { pagination, updatePagination } from './paginator/pagination';

export function goToCartPage() {
  getCatalogue().then(() => {
    generateCart();
    if (cart.getItemsCount()) {
      pagination();
      const cartContainer = document.querySelector('.cart__container') as HTMLDivElement;

      cartContainer.addEventListener('click', (e) => {
        let id: string;
        const addButton = e.target as HTMLElement;
        const cartItem = ((addButton.parentNode as HTMLDivElement).parentNode as HTMLDivElement)
          .parentNode as HTMLDivElement;
        id = (cartItem as HTMLDivElement).getAttribute('data-id') as string;

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
              }, 500);
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

    cartItems.forEach((item) => {
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

  function renderItemAmountSum(e: Event) {
    let container = document.querySelector('.cart__container') as HTMLDivElement;
    if (e.target === container) return;
    const item = (e.target as HTMLElement).closest('.cart-item__container') as HTMLDivElement;
    const sum = item.querySelector('.cart-item__price') as HTMLDivElement;
    const id = (item as HTMLDivElement).getAttribute('data-id') as string;
    const input = item.querySelector('.cart-item__input_add-item') as HTMLDivElement;
    let currentSum = cart.getItemSum(id);
    let amount = cart.getItemAmount(id);
    console.log(currentSum);
    console.log(amount);
    if (amount && currentSum) {
      input.textContent = amount.toString();
      sum.textContent = `$ ${currentSum.toString()}`;
    }
  }
}
export function renderItemsCount(): void {
  const cartItems = document.querySelector('.basket__items-in-cart') as HTMLDivElement;
  const summaryAmount = document.querySelector('.cart__number-of-products') as HTMLDivElement;
  const summarySum = document.querySelector('.cart__total-sum') as HTMLDivElement;

  let counter = cart.getItemsCount();
  if (counter > 0) {
    cartItems.classList.add('active');
  } else cartItems.classList.remove('active');
  cartItems.textContent = counter.toString();
  if (summaryAmount) summaryAmount.textContent = `Products: ${counter.toString()}`;
  if (summarySum) summarySum.textContent = `Total: $${cart.getTotalSum().toString()}`;

}

export function renderTotalSum(): void {
  const cartItems = document.querySelector('.header__total') as HTMLDivElement;
  let counter = cart.getTotalSum();
  if (counter > 0) {
    cartItems.classList.add('active');
  } else cartItems.classList.remove('active');
  cartItems.textContent = `You have to pay: ${counter.toString()}\$`;
}

export default goToCartPage;
