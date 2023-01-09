import { cart } from '../checkout/checkout';
import { checkForm, generateSuccess, validate } from './render-payment';

export function inputCorrectDate(this: HTMLInputElement): void {
  this.value = this.value.replace(/[\Da-zа-я.]/, '');
  const res: string[] = this.value.split('');
  res.splice(2, 0, '/');
  if (this.value.length > 2) {
    this.value = res.join('');
  }
  if (this.value.length > 5) {
    this.value = this.value.slice(0, 5);
  }
}

export function inputCorrectCardNumber(this: HTMLInputElement): void {
  this.value = this.value.replace(/\D/, '');
  if (this.value.length > 16) {
    this.value = this.value.slice(0, 16);
  }
}

function toggleWrongMessage() {
  const form = document.querySelector('.payment__form') as HTMLDivElement;
  const wrongItems = form.querySelectorAll('.invalid');
  console.log(form)
  wrongItems.forEach(item => {
    item.nextElementSibling?.classList.add('active')
  console.log( item.nextElementSibling)});
  setTimeout(() => {
    wrongItems.forEach(item => item.nextElementSibling?.classList.remove('active'));
  }, 3000);
}

export function validateForm(): void {
  checkForm();
  if (validate.validateForm()) {
    cart.clearCart();
    generateSuccess();
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);
  } else toggleWrongMessage() ;
}


export function inputCorrectCvv(this: HTMLInputElement): void {
  this.value = this.value.replace(/\D/, '');
  if (this.value.length > 3) {
    this.value = this.value.slice(0, 3);
  }
}

