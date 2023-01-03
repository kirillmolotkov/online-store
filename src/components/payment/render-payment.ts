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
  const email = document.querySelector('.payment__credentials_email') as HTMLDivElement;
  const phone = document.querySelector('.payment__credentials_phone') as HTMLDivElement;
  const recieverName = document.querySelector('.payment__credentials_name') as HTMLInputElement;
  const closeBtn = document.querySelector('.payment__close') as HTMLDivElement;
  const cardNumber = document.querySelector('.card__number') as HTMLInputElement;
  const cardholder = document.querySelector('.card__item_holder') as HTMLInputElement;
  const expireDate = document.querySelector('.card__item_expire') as HTMLInputElement;
  const CVV = document.querySelector('.card__item_cvv') as HTMLInputElement;

  email.addEventListener('focusout', checkEmail);
  phone.addEventListener('input', checkPhoneNumber)
  recieverName.addEventListener('focusout', checkCardHolder);
  cardholder.addEventListener('focusout', checkCardHolder);
  expireDate.addEventListener('focusout', checkExpireDate);
  expireDate.addEventListener('input', inputCorrectDate);
  cardNumber.addEventListener('input', definePaymentSystem);
  cardNumber.addEventListener('focusout', checkCardNumber);
  CVV.addEventListener('focusout', checkCVV);
  closeBtn.addEventListener('click', togglePaymentWindow);
}

function inputCorrectDate(this: HTMLInputElement) {
  if (this.value.length === 2) this.value = this.value + '/';
  // let regex: RegExp = /[a-z]/;
  // this.value = this.value.replace(regex, '$`')
  console.log(this.value)
  if (this.value.length > 5) {
     this.value = this.value.slice(0, 5)
  }
}

function definePaymentSystem():void{
  const cardNumber = document.querySelector('.card__number') as HTMLInputElement;
  const systemIcon = document.querySelector('.card__payment-system') as HTMLInputElement;
  let number: string = cardNumber.value;
  let system: string | undefined = validate.definePaymentSystem(number);
  console.log(`/src/assets/icons/${system}.png`)
 systemIcon.style.backgroundImage = `url('/src/assets/icons/${system}.png')`

}

function checkCardNumber(this: HTMLInputElement) {
  let number: string = this.value ;
  console.log(validate.checkCardNumber(number));
  if (validate.checkCardNumber(number)) {
    this.classList.remove('invalid');
    this.classList.add('valid');
  } else {
    this.classList.remove('valid')
    this.classList.add('invalid');
  }
}
function checkEmail() {
  
}

function checkPhoneNumber() {
  
}


function checkCardHolder(this: HTMLInputElement):void {

  let fullName: string = this.value;
  console.log(validate.checkFullName(fullName));
  if (validate.checkFullName(fullName)) {
    this.classList.remove('invalid');
    this.classList.add('valid');
  } else {
    this.classList.remove('valid')
    this.classList.add('invalid');
  }
}
function checkExpireDate() {
  const date = document.querySelector('.card__item_expire') as HTMLInputElement;
  console.log(date.value);
  console.log(validate.checkExpiration(date.value));
  if (validate.checkExpiration(date.value)) {
    date.classList.remove('invalid');
    date.classList.add('valid');
  } else {
    date.classList.remove('valid')
    date.classList.add('invalid');
  }
}
function checkCVV() {
  const cvv = document.querySelector('.card__item_cvv') as HTMLInputElement;
  let trimmedString:string = cvv.value.trim();
  cvv.value = trimmedString;
  if (validate.checkCVV(trimmedString)) {
    cvv.classList.remove('invalid');
    cvv.classList.add('valid');
  } else {
    cvv.classList.remove('valid')
    cvv.classList.add('invalid');
  }
}


