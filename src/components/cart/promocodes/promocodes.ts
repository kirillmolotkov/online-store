import { cart } from '../../checkout/checkout';
import { Icodes } from '../../../types/interfaces';
export function promo() {
  const promoBtn = document.querySelector('.cart-item__button_buy-now') as HTMLInputElement;
  const summary = document.querySelector('.cart_summary') as HTMLDivElement;

summary.addEventListener('click', removeDiscount)
  promoBtn.addEventListener('click', promoController);

  function getSum(): number {
    return cart.getTotalSum();
  }
  // function applyDiscount(discount: string): number {
  //   // const totalSum: number = cart.getTotalSum();
  //   const totalSums: NodeListOf<HTMLDivElement> = document.querySelectorAll('.cart__total-sum');
  //   const sum = totalSums[totalSums.length - 1].textContent;
  //   let lastSum: number;
  //   if (sum) {
  //     lastSum = Number(sum);
  //     console.log(totalSums);
  //     console.log(lastSum);
  //     return Math.round(10*(lastSum - lastSum * discount))/10;
  //   }
  //   return -1;
  // }

  function drawNewPrice(price: number, code: string): void {
    const summary = document.querySelector('.cart_summary') as HTMLDivElement;
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
    summary.insertBefore(newSum, inputCode);
  }

  function promoController() {
    const inputCode: string | null = (document.querySelector('.cart__promo') as HTMLInputElement).value;
    let discount: Icodes = cart.applyDiscount(inputCode);
    if (discount.discount === -2) return;
    if (discount.discount != -1) {
      drawNewPrice(discount.discount, discount.code);
      return;
    }
    alert('Promocode not found');
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

  function renderRemoveDiscount(promoCode: string): void {
    const deleteBtn = document.querySelector(`div[data-promo= ${promoCode}]`) as HTMLDivElement;
    const node = deleteBtn.parentNode as HTMLDivElement;
    node.remove();
    const sums: NodeListOf<HTMLDivElement>  = document.querySelectorAll('.cart__total-sum');
    const actualsum = sums[sums.length - 1] as HTMLDivElement;
    actualsum.style.textDecoration = 'none';
    actualsum.textContent = cart.getDiscountedPrice().toString();
  }
}

export default promo;
