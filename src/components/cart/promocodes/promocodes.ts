import { cart } from '../../checkout/checkout';
import { Icodes } from '../../../types/interfaces';
import { payment } from '../../payment/render-payment';

export function togglePaymentWindow(): void {
  const paymentWindow = document.querySelector('.payment') as HTMLDivElement;
  paymentWindow.classList.toggle('payment_open');
  payment();
}

export function promo() {
  const promoBtn = document.querySelector('.cart-item__button_apply-promo') as HTMLInputElement;
  const summary = document.querySelector('.cart_summary') as HTMLDivElement;
  const buyNowBtn = document.querySelector('.cart-item__button_buy-now') as HTMLInputElement;

  function drawNewPrice(price: number, code: string): void {
    const summ = document.querySelector('.cart_summary') as HTMLDivElement;
    const totalSum = document.querySelector('.cart__total-sum') as HTMLDivElement;
    const inputCode = document.querySelector('.cart__promo') as HTMLInputElement;
    totalSum.style.textDecoration = 'line-through';
    const newSum = document.createElement('div');
    newSum.classList.add('cart__total-sum');
    newSum.textContent = `Total: $`;
    const sumText = document.createElement('span');
    sumText.classList.add('cart__total-sum');
    sumText.textContent = price.toString();
    const deleteBtn: HTMLDivElement = document.createElement('div');
    deleteBtn.dataset.promo = code;
    deleteBtn.classList.add('cart__delete-btn');
    newSum.appendChild(sumText);
    newSum.appendChild(deleteBtn);
    summ.insertBefore(newSum, inputCode);
  }
  
  function wrongPromo() {
    const promoInput = document.querySelector('.cart__promo') as HTMLInputElement;
    promoInput.value = 'WRONG PROMO'
    promoInput.classList.add('red');
    setTimeout(() => {
      promoInput.value = ''
      promoInput.classList.remove('red');
    }, 2000)
  }

  function promoController() {
    const inputCode: string | null = (document.querySelector('.cart__promo') as HTMLInputElement).value;
    const discount: Icodes = cart.applyDiscount(inputCode);
    if (discount.discount === -2) return;
    if (discount.discount !== -1) {
      drawNewPrice(discount.discount, discount.code);
      return;
    }
    wrongPromo();
  }

  function renderRemoveDiscount(promoCode: string): void {
    const deleteBtn = document.querySelector(`div[data-promo= ${promoCode}]`) as HTMLDivElement;
    const node = deleteBtn.parentNode as HTMLDivElement;
    node.remove();
    const sums: NodeListOf<HTMLDivElement> = document.querySelectorAll('.cart__total-sum');
    const actualsum = sums[sums.length - 1] as HTMLDivElement;
    actualsum.style.textDecoration = 'none';
    actualsum.textContent = cart.getDiscountedPrice().toString();
  }
  function removeDiscount(e: Event) {
    const el = e.target as HTMLDivElement;
    if (el.classList.contains('cart__delete-btn')) {
      const promoCode: string | undefined = el.dataset.promo;
      if (promoCode) {
        cart.deleteDiscount(promoCode);
        renderRemoveDiscount(promoCode);
      }
    }
  }

  summary.addEventListener('click', removeDiscount);
  promoBtn.addEventListener('click', promoController);
  buyNowBtn.addEventListener('click', togglePaymentWindow);
}

export default promo;
