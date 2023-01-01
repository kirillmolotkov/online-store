class Validation {
  checkFullName(fullName: string): boolean {
    const regex: RegExp = /[0-9,\.\*\\\t\n\r]/gi;
    return (
      fullName.split('').length === 2 && fullName.split('').every((name) => name.length > 3) && !regex.test(fullName)
    );
  }
  checkPhoneNumber(phoneNumber: string): boolean {
    const regex:RegExp = /+[0-9]{9,}/g
    return regex.test(phoneNumber);
}

checkEmail(email: string): boolean {
  const regex:RegExp = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/
  return regex.test(email);
  }
  checkCardNumber(cardNumber: string) {
    const regex:RegExp = /[0-9]{16}/
    return regex.test(cardNumber);
  }  

  checkExpiration(cardNumber: string):boolean {
    const regex: RegExp = /[0-9]{4}/
    if (regex.test(cardNumber)) {
      if (Number(cardNumber[0] + cardNumber[1]) <= 12 && Number(cardNumber[2] + cardNumber[3]) <= 31)
        return true;
  }
    return false;
  }

  checkCVV(cvv:string) {
    const regex:RegExp = /[0-9]{3}/
    return regex.test(cvv);
  }

  definePaymentSystem(cardNumber: string) {
    switch (cardNumber.slice(0, 1)) {
      case '3':
        return 'american-express';
      case '4':
        return 'visa';
      case '5':
        return 'mastermard';
      case '6':
        return 'belcard';
   }
  }



}
