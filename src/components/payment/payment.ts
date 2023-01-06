import { cart } from '../checkout/checkout';
import { generateSuccess, validate } from './render-payment';

export function inputCorrectDate(this: HTMLInputElement): void {
  this.value = this.value.replace(/[\Da-zа-я\.]/, '');
  let res: any = this.value.split('');
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

export function validateForm(): void {
  if (validate.validateForm()) {
    cart.clearCart();
    generateSuccess();
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 5000);
  } else console.log('no ok');
}

export function inputCorrectCvv(this: HTMLInputElement): void {
  this.value = this.value.replace(/\D/, '');
  if (this.value.length > 3) {
    this.value = this.value.slice(0, 3);
  }
}

