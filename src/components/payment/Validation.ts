import { IValidate } from '../../types/interfaces';
class Validation {
  isValidated: IValidate = {
    fullName: false,
    adress: false,
    phoneNumber: false,
    email: false,
    cvv: false,
    cardNumber: false,
    expiration: false,
  };

  checkFullName(fullName: string): boolean {
    const NUMBER_OF_WORDS = 2;
    const NUMBER_OF_LETTERS = 3;
    const regex = /[0-9,.*\\\t\n\rа-я]/gi;
    if (
      fullName.split(' ').length === NUMBER_OF_WORDS &&
      fullName.split(' ').every((name) => name.length > NUMBER_OF_LETTERS) &&
      !regex.test(fullName)
    ) {
      this.isValidated.fullName = true;
      return true;
    } 
      this.isValidated.fullName = false;
      return false;
    
  }

  checkAdress(adress: string): boolean {
    const NUMBER_OF_WORDS = 3;
    const NUMBER_OF_LETTERS = 5;
    const regex = /[0-9,.*\\\t\n\rа-я]/gi;
    if (adress.split(' ').length >= NUMBER_OF_WORDS && adress.split(' ').every((name) => name.length >= NUMBER_OF_LETTERS) && !regex.test(adress)) {
      this.isValidated.adress = true;
      return true;
    }
    this.isValidated.adress = false;
    return false;
  }

  checkPhoneNumber(phoneNumber: string): boolean {
    const regex = /\+[0-9]{9,}/g;
    if (regex.test(phoneNumber)) {
      this.isValidated.phoneNumber = true;
      return true;
    }
    this.isValidated.phoneNumber = false;
    return false;
  }

  checkEmail(email: string): boolean {
    const regex =
      /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
    if (regex.test(email)) {
      this.isValidated.email = true;
      return true;
    }
    this.isValidated.email = false;
    return false;
  }

  checkCardNumber(cardNumber: string): boolean {
    const regex = /\b[0-9]{16}\b/;
    if (regex.test(cardNumber)) {
      this.isValidated.cardNumber = true;
      return true;
    }
    this.isValidated.cardNumber = false;
    return false;
  }

  checkExpiration(expireDate: string): boolean {
    const regex = /[0-9]{2}\/[0-9]{2}/;
    if (regex.test(expireDate)) {
      if (Number(expireDate[0] + expireDate[1]) <= 12) {
        this.isValidated.expiration = true;
        return true;
      }
    }
      this.isValidated.expiration = false;
      return false;
  }

  checkCVV(cvv: string): boolean {
    const regex = /[0-9]{3}/;
    if (cvv.length === 3 && regex.test(cvv)) {
      this.isValidated.cvv = true;
      return true;
    }
    this.isValidated.cvv = false;
    return false;
  }

  definePaymentSystem(cardNumber: string): string | undefined {
    switch (cardNumber.slice(0, 1)) {
      case '3':
        return 'american-express';
      case '4':
        return 'visa';
      case '5':
        return 'mastercard';
      case '6':
        return 'mir';
      default:
        return undefined;
    }
  }

  validateForm(): boolean {
    const array: boolean[] = Object.values(this.isValidated);
    if (array.every((item) => item === true)) return true;
    return false;
  }
}

export default Validation;
