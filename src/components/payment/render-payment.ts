import { togglePaymentWindow } from "../cart/promocodes/promocodes";
import Validation from '../../components/payment/Validation'
const validate = new Validation;

function generatePaymentWindow(): void {
  const body = document.querySelector('.body') as HTMLDivElement;
  const paymentTempate = document.querySelector('#payment') as HTMLTemplateElement;
  const paymentLayout = paymentTempate.content.cloneNode(true) as HTMLDivElement;
  const fragment: DocumentFragment = document.createDocumentFragment();
  fragment.append(paymentLayout);
  body.append(fragment);
}

export function payment(): void {
  const closeBtn = document.querySelector('.payment__close') as HTMLDivElement;
  const cardNumber = document.querySelector('.card__number') as HTMLInputElement;
  const cardholder = document.querySelector('.card__item_holder') as HTMLInputElement;
  const expireDate = document.querySelector('.card__item_expire') as HTMLInputElement;
  const CVV = document.querySelector('.card__item_cvv') as HTMLInputElement;

  cardNumber.addEventListener('focusout', checkCardNumber);
  cardNumber.addEventListener('input', definePaymentSystem)
  cardholder.addEventListener('focusout', checkCardHolder);
  expireDate.addEventListener('focusout', checkExpireDate);
  CVV.addEventListener('focusout', checkCVV);
  closeBtn.addEventListener('click', togglePaymentWindow);

}

function definePaymentSystem():void{
  const cardNumber = document.querySelector('.card__number') as HTMLInputElement;
  const systemIcon = document.querySelector('.card__payment-system') as HTMLInputElement;
  let number: string = cardNumber.value;
  let system: string | undefined = validate.definePaymentSystem(number);
  console.log(`/src/assets/icons/${system}.png`)
 systemIcon.style.backgroundImage = `url('/src/assets/icons/${system}.png')`

}

function checkCardNumber() {
  const cardNumber = document.querySelector('.card__number') as HTMLInputElement;
  let number: string = cardNumber.value;
  console.log(validate.checkCardNumber(number));
  if (validate.checkCardNumber(number)) {
    cardNumber.classList.remove('invalid');
    cardNumber.classList.add('valid');
  } else {
    cardNumber.classList.remove('valid')
    cardNumber.classList.add('invalid');
  }
}

function checkCardHolder():void {
  const name = document.querySelector('.card__item_holder') as HTMLInputElement;
  let fullName: string = name.value;
  console.log(validate.checkFullName(fullName));
  if (validate.checkFullName(fullName)) {
    name.classList.remove('invalid');
    name.classList.add('valid');
  } else {
    name.classList.remove('valid')
    name.classList.add('invalid');
  }
}
function checkExpireDate() {
  
}
function checkCVV() {
  
}


