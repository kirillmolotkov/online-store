import { IbasketItem, IproductItem } from '../../types/interfaces';

export let CATALOGUE: Map<string, IproductItem>;

export async function getCatalogue() {
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

  public getBasket(): IbasketItem[] {
    return [...this.basket.values()];
  }
  public loadBasketFromStorage(): void {
    let cache: string | null = localStorage.getItem('basket')
    if (cache) {
      this.basket = new Map(JSON.parse(cache));
      console.log(this.basket)
    }
  }
  private updateCache(): void{
   localStorage.setItem('basket', JSON.stringify([...this.basket]))
  }

  public addToCart(id: string): boolean {
    let prod = CATALOGUE.get(id);
    let itemInBasket: IbasketItem | undefined = this.basket.get(id);
    if (prod) {
      if (itemInBasket) {
        if (prod.stock > itemInBasket.amount) {
          itemInBasket.amount += 1;
          this.updateCache();
          return true;
        } else return false;
      } else {
        itemInBasket = { id: prod.id, amount: 1 };
        this.basket.set(id, itemInBasket);
        this.updateCache();
        return true;
      }
    }
    
    return false;
  }

  private deleteFromCart(id: string): void {
    let itemInBasket: IbasketItem | undefined = this.basket.get(id);
    if (itemInBasket) {
      this.basket.delete(id);
      this.updateCache();
    }
  }

  public decreaseItemAmount(id: string) {
    let itemInBasket: IbasketItem | undefined = this.basket.get(id);
    if (itemInBasket) {
      if (itemInBasket.amount > 1) {
        itemInBasket.amount -= 1;
        return true;
      } else this.deleteFromCart(id);
    }
    this.updateCache();
    return false;
  }

  public getItemsCount(): number {
    return [...this.basket.values()].reduce((sum, value) => sum + value.amount, 0);
  }

 public getTotalSum(): number {
    let sums: number[] = [];
    this.basket.forEach((value) => {
      let prod = CATALOGUE.get(value.id);
      if (prod && prod.price) {
        sums.push(value.amount * prod.price);
      }
    });
    return sums.reduce((sum, item) => sum + item, 0);
  }

 public getItemAmount(id: string): number | undefined {
    return this.basket.get(id)?.amount;
  }
  public getItemSum(id: string): number | undefined {
    let price = CATALOGUE.get(id)?.price
    let amount = this.getItemAmount(id);
    if (price && amount)
      return amount * price;
}

}

export default Checkout;
