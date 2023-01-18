import { cart } from '../checkout/checkout';
import { checkForm, generateSuccess, validate } from './render-payment';

export function inputCorrectDate(this: HTMLInputElement): void {
  const LENGTH_OF_FIRST_PART = 2;
  const LENGTH_OF_DATE = 5;

  this.value = this.value.replace(/[\Da-zа-я.]/, '');
  const RES: string[] = this.value.split('');
  RES.splice(2, 0, '/');
  if (this.value.length > LENGTH_OF_FIRST_PART) {
    this.value = RES.join('');
  }
  if (this.value.length > LENGTH_OF_DATE) {
    this.value = this.value.slice(0, LENGTH_OF_DATE);
  }
}

export function inputCorrectCardNumber(this: HTMLInputElement): void {
  const LENGTH_OF_CARD_NUMBER = 16;
  this.value = this.value.replace(/\D/, '');
  if (this.value.length > LENGTH_OF_CARD_NUMBER) {
    this.value = this.value.slice(0, LENGTH_OF_CARD_NUMBER);
  }
}

function toggleWrongMessage() {
  const TIME_TO_REMOVE_MESSAGE = 3000;
  const FORM = document.querySelector('.payment__form') as HTMLDivElement;
  const WRONG_ITEMS = FORM.querySelectorAll('.invalid');
  WRONG_ITEMS.forEach((item) => {
    item.nextElementSibling?.classList.add('active');
  });
  setTimeout(() => {
    WRONG_ITEMS.forEach((item) => item.nextElementSibling?.classList.remove('active'));
  }, TIME_TO_REMOVE_MESSAGE);
}

export function validateForm(): void {
  const TIME_TO_REDIRECT = 3000;
  checkForm();
  if (validate.validateForm()) {
    cart.clearCart();
    generateSuccess();
    setTimeout(() => {
      window.location.href = 'index.html';
    }, TIME_TO_REDIRECT);
  } else toggleWrongMessage();
}

export function inputCorrectCvv(this: HTMLInputElement): void {
  this.value = this.value.replace(/\D/, '');
  if (this.value.length > 3) {
    this.value = this.value.slice(0, 3);
  }
}
