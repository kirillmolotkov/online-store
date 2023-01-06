const goods = document.querySelector('.goods') as HTMLDivElement;
import { CATALOGUE } from '../checkout/Cart';
import { renderItemsCount, renderTotalSum } from '../cart/renderCart';
import { cart } from '../checkout/checkout';

goods.addEventListener('click', openDetailsPage);

function openDetailsPage(e: Event): void {
  let id: string;
  const addButton = e.target as HTMLElement;
  if (addButton.classList.contains('sku__button_details')) {
    id = (addButton as HTMLDivElement).getAttribute('data-id') as string;
    generateDetails(id);
    const addToCartBtn = document.querySelector('.btn_details-add') as HTMLButtonElement;
    const buyNow = document.querySelector('.btn_details-buy') as HTMLButtonElement;
    addToCartBtn.addEventListener('click', addToCart);
  }
}

function addToCart(this: HTMLButtonElement) {
  let id: string = this.getAttribute('data-id') as string;
  cart.addToCart(id);
  renderItemsCount();
  renderTotalSum();
}

function generateBreadCrumbs(id: string) {
  const category = document.querySelector('.breadcrumbs__item_category') as HTMLDivElement;
  const brand = document.querySelector('.breadcrumbs__item_brand') as HTMLDivElement;
  const model = document.querySelector('.breadcrumbs__item_model') as HTMLDivElement;
  const prod = CATALOGUE.get(id);
}

function generateDetails(id: string): void {
  const body = document.querySelector('.body') as HTMLDivElement;
  const main = document.querySelector('.main') as HTMLDivElement;

  const itemTemplate = document.querySelector('#details') as HTMLTemplateElement;
  const itemLayout = itemTemplate.content.cloneNode(true) as HTMLDivElement;
  const fragment: DocumentFragment = document.createDocumentFragment();
  // const itemList = document.querySelector('.cart__container') as HTMLOListElement;
  fragment.append(itemLayout);
  const prod = CATALOGUE.get(id);
  if (prod) {
    const cat = fragment.querySelector('.breadcrumbs__item_category') as HTMLDivElement;
    cat.textContent = `${prod.category}`;
    const brand = fragment.querySelector('.breadcrumbs__item_brand') as HTMLDivElement;
    brand.textContent = `${prod.brand}`;
    const modelDesc  = fragment.querySelector('.details__heading') as HTMLDivElement;
    modelDesc.textContent = `${prod.title}`;
    const model = fragment.querySelector('.breadcrumbs__item_model') as HTMLDivElement;
    model.textContent = `${prod.title}`;
    const addBtn = fragment.querySelector('.btn_details-add') as HTMLButtonElement;
    addBtn.setAttribute('data-id', prod.id);
    const buyBtn = fragment.querySelector('.btn_details-buy') as HTMLButtonElement;
    buyBtn.setAttribute('data-id', prod.id);
    const description = fragment.querySelector('.details__item_description') as HTMLDivElement;
    description.textContent = `${prod.description}`;
    const discount = fragment.querySelector('.details__item_discount') as HTMLDivElement;
    discount.textContent = `${prod.discountPercentage}`;
    const rating = fragment.querySelector('.details__item_rating') as HTMLDivElement;
    rating.textContent = `${prod.rating}`;
    const stock = fragment.querySelector('.details__item_stock') as HTMLDivElement;
    stock.textContent = `${prod.stock}`;
    const category = fragment.querySelector('.details__item_category') as HTMLDivElement;
    category.textContent = `${prod.category}`;
    // const thumbs = fragment.querySelectorAll('.slider__thumb) as HTMLImageElement;
    // thumbs.src = `${prod.description}`;
    const price = fragment.querySelector('.details__price') as HTMLDivElement;
    price.textContent = `$ ${prod.price}`;
  }
  console.log(fragment)
  body.replaceChild(fragment, main);
}
