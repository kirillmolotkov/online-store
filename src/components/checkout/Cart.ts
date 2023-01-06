import { IbasketItem, Icodes, IproductItem } from '../../types/interfaces';

export let CATALOGUE: Map<string, IproductItem>;

export async function getCatalogue() {
  let response = await fetch('./data/data.json');
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
  private CODES: Icodes[] = [
    {
      code: 'RS',
      discount: 0.1,
    },
    {
      code: 'DreamTeam',
      discount: 0.2,
    },
  ];

  private appliedCODES: string[] = [];
  private discounted: number = 0;

  public getDiscountedPrice(): number {
    return this.discounted;
  }
  public checkCode(promocode: string) {
    return this.CODES.find((item) => item.code === promocode);
  }

  public applyDiscount(code: string): Icodes {
    let promo = this.checkCode(code);
    if (this.discounted === 0) this.discounted = this.getTotalSum();
    if (promo) {
      if (this.appliedCODES.includes(code))
        return {
          code: code,
          discount: -2,
        };
      this.appliedCODES.push(promo.code);
      this.discounted = Math.round(10 * (this.discounted - this.discounted * promo.discount)) / 10;
      return {
        code: code,
        discount: this.discounted,
      };
    }
    return {
      code: code,
      discount: -1,
    };
  }

  public deleteDiscount(code: string): void {
    let promo = this.checkCode(code);
    if (promo) {
      this.appliedCODES.splice(this.appliedCODES.indexOf(code), 1);
      this.discounted = Math.round((this.discounted / (1 - promo.discount)) * 10) / 10;
    }
  }

  public getBasket(): IbasketItem[] {
    return [...this.basket.values()];
  }
  public loadBasketFromStorage(): void {
    let cache: string | null = localStorage.getItem('basket');
    if (cache) {
      this.basket = new Map(JSON.parse(cache));
    }
  }
  private updateCache(): void {
    localStorage.setItem('basket', JSON.stringify([...this.basket]));
  }

  public addToCart(id: string): boolean {
    let prod = CATALOGUE.get(id);
    let itemInBasket: IbasketItem | undefined = this.basket.get(id);
    if (prod) {
      if (itemInBasket) {
        if (prod.stock > itemInBasket.amount) {
          itemInBasket.amount += 1;
          this.updateCache();
          this.discounted = 0;
          return true;
        } else return false;
      } else {
        itemInBasket = { id: prod.id, amount: 1 };
        this.basket.set(id, itemInBasket);
        this.updateCache();
        this.discounted = 0;
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
      this.discounted = 0;
    }
  }

  public decreaseItemAmount(id: string):boolean {
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
    let price = CATALOGUE.get(id)?.price;
    let amount = this.getItemAmount(id);
    if (price && amount) return amount * price;
  }
  public clearCart():void {
    this.basket = new Map();
    console.log(this.basket);
    this.discounted = 0;
    this.appliedCODES = [];
    localStorage.setItem('basket', '')
  }
}

export default Checkout;
