const main = document.querySelector('.main') as HTMLDivElement;
import { IproductItem } from '../../types/interfaces';
// import cartLayout from './templates/cartLayout'

function clearMain() {
  main.remove()
}

function generateCart() {
  const cartTemplate = document.querySelector('#cartLayout') as HTMLTemplateElement;
  const fragment: DocumentFragment = document.createDocumentFragment();
  const cartLayout = cartTemplate.content.cloneNode(true) as HTMLDivElement;

  fragment.append(cartLayout)
  main.append(fragment)
}



clearMain();
generateCart();



let template:string 