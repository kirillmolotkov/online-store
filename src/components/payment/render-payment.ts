import { togglePaymentWindow } from '../cart/promocodes/promocodes';
import Validation from '../../components/payment/Validation';
import { inputCorrectDate, inputCorrectCardNumber, validateForm, inputCorrectCvv } from './payment';
import htmlGenerator from '../utils/htmlgenerator';
export const validate = new Validation();

function checkAdress(this: HTMLTextAreaElement): void {
  const adress: string = this.value;
  if (validate.checkAdress(adress)) {
    this.classList.remove('invalid');
    this.classList.add('valid');
  } else {
    this.classList.remove('valid');
    this.classList.add('invalid');
  }
}

function definePaymentSystem(): void {
  const cardNumber = document.querySelector('.card__number') as HTMLInputElement;
  const systemIcon = document.querySelector('.card__payment-system') as HTMLInputElement;
  const number: string = cardNumber.value;
  const system: string | undefined = validate.definePaymentSystem(number);
  if (system === undefined) {
    systemIcon.style.backgroundImage = `none`;
  } else systemIcon.style.backgroundImage = `url('/assets/icons/${system}.png')`;
}

function checkCardNumber(this: HTMLInputElement): void {
  const number: string = this.value;
  if (validate.checkCardNumber(number)) {
    this.classList.remove('invalid');
    this.classList.add('valid');
  } else {
    this.classList.remove('valid');
    this.classList.add('invalid');
  }
}

function checkEmail(this: HTMLInputElement): void {
  const email: string = this.value;
  if (validate.checkEmail(email)) {
    this.classList.remove('invalid');
    this.classList.add('valid');
  } else {
    this.classList.remove('valid');
    this.classList.add('invalid');
  }
}

function checkPhoneNumber(this: HTMLInputElement): void {
  const phoneNumber: string = this.value;
  if (validate.checkPhoneNumber(phoneNumber)) {
    this.classList.remove('invalid');
    this.classList.add('valid');
  } else {
    this.classList.remove('valid');
    this.classList.add('invalid');
  }
}

function checkCardHolder(this: HTMLInputElement): void {
  const fullName: string = this.value;
  if (validate.checkFullName(fullName)) {
    this.classList.remove('invalid');
    this.classList.add('valid');
  } else {
    this.classList.remove('valid');
    this.classList.add('invalid');
  }
}

function checkExpireDate(): void {
  const date = document.querySelector('.card__item_expire') as HTMLInputElement;
  if (validate.checkExpiration(date.value)) {
    date.classList.remove('invalid');
    date.classList.add('valid');
  } else {
    date.classList.remove('valid');
    date.classList.add('invalid');
  }
}

function checkCVV(): void {
  const cvv = document.querySelector('.card__item_cvv') as HTMLInputElement;
  const trimmedString: string = cvv.value.trim();
  cvv.value = trimmedString;
  if (validate.checkCVV(trimmedString)) {
    cvv.classList.remove('invalid');
    cvv.classList.add('valid');
  } else {
    cvv.classList.remove('valid');
    cvv.classList.add('invalid');
  }
}

export function generateSuccess(): void {
  const itemTemplate = `      <section class="success">
        <h2 class="sucsess__heading">Payment Successfull!</h2>
        <div class="success__greeting">We're glad you've spent you money here!</div>
        <button class="success__btn" onclick="location.href = 'index.html'">Goto main page</button>
      </section>`;
  const body = document.querySelector('.body') as HTMLDivElement;
  htmlGenerator(itemTemplate, body);
}
export function checkForm() {
  const email = document.querySelector('.payment__credentials_email') as HTMLInputElement;
  const phone = document.querySelector('.payment__credentials_phone') as HTMLInputElement;
  const adress = document.querySelector('.payment__credentials_adress') as HTMLTextAreaElement;
  const recieverName = document.querySelector('.payment__credentials_name') as HTMLInputElement;
  const cardNumber = document.querySelector('.card__number') as HTMLInputElement;
  const cardholder = document.querySelector('.card__item_holder') as HTMLInputElement;
  checkCardHolder.call(cardholder);
  checkCardHolder.call(recieverName);
  checkPhoneNumber.call(phone);
  checkEmail.call(email);
  checkCardNumber.call(cardNumber);
  checkAdress.call(adress);
  checkExpireDate();
  checkExpireDate();
  checkCVV();
}
export function payment(): void {
  const email = document.querySelector('.payment__credentials_email') as HTMLDivElement;
  const phone = document.querySelector('.payment__credentials_phone') as HTMLDivElement;
  const adress = document.querySelector('.payment__credentials_adress') as HTMLTextAreaElement;
  const recieverName = document.querySelector('.payment__credentials_name') as HTMLInputElement;
  const closeBtn = document.querySelector('.payment__close') as HTMLDivElement;
  const cardNumber = document.querySelector('.card__number') as HTMLInputElement;
  const cardholder = document.querySelector('.card__item_holder') as HTMLInputElement;
  const expireDate = document.querySelector('.card__item_expire') as HTMLInputElement;
  const CVV = document.querySelector('.card__item_cvv') as HTMLInputElement;
  const payBtn = document.querySelector('.payment__btn') as HTMLButtonElement;

  email.addEventListener('focusout', checkEmail);
  adress.addEventListener('focusout', checkAdress);
  phone.addEventListener('focusout', checkPhoneNumber);
  recieverName.addEventListener('focusout', checkCardHolder);
  cardholder.addEventListener('focusout', checkCardHolder);
  expireDate.addEventListener('focusout', checkExpireDate);
  expireDate.addEventListener('input', inputCorrectDate);
  cardNumber.addEventListener('input', definePaymentSystem);
  cardNumber.addEventListener('input', inputCorrectCardNumber);
  cardNumber.addEventListener('focusout', checkCardNumber);
  CVV.addEventListener('focusout', checkCVV);
  CVV.addEventListener('input', inputCorrectCvv);
  closeBtn.addEventListener('click', togglePaymentWindow);
  payBtn.addEventListener('click', validateForm);
}
export default payment;
