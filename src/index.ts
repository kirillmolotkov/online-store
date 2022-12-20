import './style.scss';
import './types/interfaces.ts';
import './components/generate-card/generateCardItems.ts';
// import './data/data.json'

import checkout from './components/checkout/checkout';
import { IproductItem, Icatalogue } from './types/interfaces';
let CATALOGUE: Icatalogue;
async function getJSON() {
  let response = await fetch('/src/data/data.json');
  CATALOGUE = await response.json();
}

getJSON();

const cart = new checkout();

const goods = document.querySelector('.goods') as HTMLDivElement;

goods.addEventListener('click', (e) => {
  let id: string;
  const addButton = e.target as HTMLElement;
  if (addButton.classList.contains('sku__button')) {
    id = (addButton.parentNode as HTMLDivElement).getAttribute('data-id') as string;
    let item: IproductItem = CATALOGUE.products.find((product) => {
      if (product.id === id) return product;
    }) as IproductItem;
    
    cart.addToCart(item);
  }
});
