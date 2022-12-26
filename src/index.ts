import './style.scss';
import './data/data.json';
import './types/interfaces.ts';
import './components/generate-card/generateCardItems.ts';
import './components/filters/generateFilters.ts';
import checkout from './components/checkout/checkout';
import './components/filters/getDataForFilters.ts';
import './components/filters/useFilters.ts';

async function getJSON() {
  let response = await fetch('./data/data.json');
  let CATALOGUE = await response.json();
  return CATALOGUE;
}
// console.log(getJSON());

const cart = checkout();

const goods = document.querySelector('.goods') as HTMLDivElement;
const addToCart = document.querySelector('.sku__button');

goods.addEventListener('click', (e) => {
  let id: string | null;
  const addButton = e.target as HTMLElement;
  if (addButton.classList.contains('sku__button')) {
    id = (addButton.parentNode as HTMLDivElement).getAttribute('data-id');
    // cart.addToCart(data[id])
  }
});
