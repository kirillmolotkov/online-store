import { IbasketItem, IproductItem } from '../../types/interfaces';

class checkout {
  private basket: [IbasketItem] = [{ id: '-1', amount: -1 }];

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
}

export default checkout;
