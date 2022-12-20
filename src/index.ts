<<<<<<< HEAD
import './style.scss'
import './data/data.json'

import checkout from './components/checkout/checkout'
async function getJSON() {
  let response = await fetch('./data/data.json');
  let CATALOGUE = await response.json();
  return CATALOGUE
}
console.log(getJSON());

const cart = checkout();

const goods = document.querySelector('.goods') as HTMLDivElement;
const addToCart = document.querySelector('.sku__button');

goods.addEventListener('click', (e) => {
  let id: string| null;
  const addButton = (e.target as HTMLElement)
  if (addButton.classList.contains('sku__button')) {
    id = (addButton.parentNode as HTMLDivElement).getAttribute('data-id');
    // cart.addToCart(data[id]) 
  }
})


=======
import './style.scss';
import './types/interfaces.ts';
import './components/generate-card/generateCardItems.ts';
>>>>>>> 6cd857b3f39df55a7e346255b35a4e4fcffaed58
