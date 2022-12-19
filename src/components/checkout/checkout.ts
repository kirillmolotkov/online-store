import { basketItem, productItem } from '../../types/interfaces';

const checkout = function () {
  let basket: [basketItem];
  return {
    addToCart: function (item: productItem) {
      for (let product of basket) {
        if (product.id === item.id) {
          product.amount += 1;
          return;
        } else {
          let newItem: basketItem = {
            id: item.id,
            amount: 1,
          };
          basket.push(newItem);
        }
      }
    },

    deleteFromCart: function (item: productItem) {
      for (let product of basket) {
        if (product.id === item.id) {
          basket.slice(basket.indexOf(product), 1);
          return;
        }
      }
    },

    decreaseItemAmount: function (item: productItem) {
      for (let product of basket) {
        if (product.id === item.id) {
          product.amount -= 1;
          return;
        }
      }
    },
  };
};

export default checkout;
