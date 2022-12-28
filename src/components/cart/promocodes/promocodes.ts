import { cart } from '../../checkout/checkout';


export function promo() {
  const promoBtn = document.querySelector('.cart-item__button_buy-now') as HTMLInputElement;
  console.log(promoBtn);


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

  function drawNewPrice(price: number): void {
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
    newSum.appendChild(sumText);
    summary.insertBefore(newSum, inputCode);
  }

  function promoController() {
    const inputCode: string | null = (document.querySelector('.cart__promo') as HTMLInputElement).value;
    for (let code of CODES) {
      console.log(code.code);
      console.log(inputCode);
      if (code.code === inputCode) {
        drawNewPrice(applyDiscount(code.code));
        return;
      }
    }
    alert('Promocode not found');
  }
}

export default promo;
