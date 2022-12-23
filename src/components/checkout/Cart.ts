import { IbasketItem, IproductItem } from '../../types/interfaces';

let CATALOGUE: Map<string, IproductItem>;

async function getCatalogue() {
  let response = await fetch('/dist/data/data.json');
  let CAT: [IproductItem] = await response.json();

  const CATALOGUE: Map<string, IproductItem> = new Map();
  CAT.forEach((item) => CATALOGUE.set(item.id, item));
  for (let prod of CAT) {
    CATALOGUE.set(prod.id, prod);
  }
  return CATALOGUE;
}

getCatalogue().then((data) => {
  CATALOGUE = data;
});

export class Checkout {
  private basket: Map<string, IbasketItem> = new Map();

  addToCart(id: string): boolean {
    let prod = CATALOGUE.get(id);
    let itemInBasket: IbasketItem | undefined = this.basket.get(id);
    if (prod) {
      if (itemInBasket) {
        if (prod.stock > itemInBasket.amount) {
          itemInBasket.amount += 1;
          console.log(this.basket);
          return true;
        } else return false;
      } else {
        console.log('hi');
        itemInBasket = { id: prod.id, amount: 1 };
        this.basket.set(id, itemInBasket);
        console.log(this.basket);
        return true;
      }
    }
    return false;
  }

  deleteFromCart(id: string): void {
    let itemInBasket: IbasketItem | undefined = this.basket.get(id);
    if (itemInBasket) {
      this.basket.delete(id);
    }
  }

  decreaseItemAmount(id: string) {
    let itemInBasket: IbasketItem | undefined = this.basket.get(id);
    if (itemInBasket) {
      if (itemInBasket.amount > 1) {
        itemInBasket.amount -= 1;
        console.log(this.basket);
        return true;
      } else this.deleteFromCart(id);
    }
    return false;
  }

  getItemsCount(): number {
    return [...this.basket.values()].reduce((sum, value) => sum + value.amount, 0)
  }

  getTotalSum(): number {
    let sums: number[] = [];
    this.basket.forEach((value) => {
      let prod = CATALOGUE.get(value.id);
      if (prod && prod.price) {
        sums.push(value.amount * prod.price);
      }
    });
    return sums.reduce((sum, item) => sum + item, 0);
  }

  getItemAmount(id:string): number | undefined {
    return this.basket.get(id)?.amount;
  }

}

export default Checkout;
