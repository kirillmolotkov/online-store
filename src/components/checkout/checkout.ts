import { IbasketItem, IproductItem } from '../../types/interfaces';

class Checkout {
  private basket: [IbasketItem] = [{ id: '-1', amount: 0 }];
  // private map = new Map();

  addToCart(item: IproductItem) {
    for (let product of this.basket) {
      if (product.id === item.id) {
        product.amount += 1;
        console.log(this.basket);
        return;
      }
    }
    let newItem: IbasketItem = {
      id: item.id,
      amount: 1,
    };
    this.basket.push(newItem);
    console.log(this.basket);
  }

  deleteFromCart(item: IproductItem) {
    for (let product of this.basket) {
      if (product.id === item.id) {
        this.basket.slice(this.basket.indexOf(product), 1);
        return;
      }
    }
  }

  decreaseItemAmount(item: IproductItem) {
    for (let product of this.basket) {
      if (product.id === item.id) {
        product.amount -= 1;
        return;
      }
    }
  }
  getItemsCount(): number {
    return this.basket.reduce((sum, item) => sum + item.amount, 0);
  }

  getTotalSum(): number {
    let totalSum: number = 0;
    for (let item of this.basket) {
      let prod = CATALOGUE.find(product => product.id === item.id);
      if (prod)
      totalSum += item.amount * prod.price
    }
    return totalSum;
  }
}

let CATALOGUE: IproductItem[];
async function getJSON() {
  let response = await fetch('/dist/data/data.json');
  CATALOGUE = await response.json();
}

getJSON();

const cart: Checkout = new Checkout();

const goods = document.querySelector('.goods') as HTMLDivElement;

goods.addEventListener('click', (e) => {
  let id: string;
  const addButton = e.target as HTMLElement;
  if (addButton.classList.contains('sku__button_add-to-card')) {
    id = (addButton as HTMLDivElement).getAttribute('data-id') as string;
    let item: IproductItem = CATALOGUE.find((product) => {
      if (product.id === id) return product;
    }) as IproductItem;
    cart.addToCart(item);
    renderItemCount();
    renderTotalSum();
  }
});

function renderItemCount(): void {
  const cartItems = document.querySelector('.basket__items-in-cart') as HTMLDivElement;
  let counter = cart.getItemsCount();
  if (counter > 0) {
    cartItems.classList.add('active');
  }
  cartItems.textContent = counter.toString();
}

function renderTotalSum(): void {
  const cartItems = document.querySelector('.header__total') as HTMLDivElement;
  let counter = cart.getTotalSum();
  if (counter > 0) {
    cartItems.classList.add('active');
  }
  cartItems.textContent = `You have to pay: ${counter.toString()}\$`;
}

export default Checkout;
