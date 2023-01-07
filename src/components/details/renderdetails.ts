const goods = document.querySelector('.goods') as HTMLDivElement;
import { CATALOGUE } from '../checkout/Cart';
import goToCartPage, { renderItemsCount, renderTotalSum } from '../cart/renderCart';
import { cart } from '../checkout/checkout';
import { payment, generatePaymentWindow } from '../payment/render-payment';
import { togglePaymentWindow } from '../cart/promocodes/promocodes';

goods.addEventListener('click', openDetailsPage);

function openDetailsPage(e: Event): void {
  let id: string;
  const addButton = e.target as HTMLElement;
  if (addButton.classList.contains('sku__button_details')) {
    id = (addButton as HTMLDivElement).getAttribute('data-id') as string;
    generateDetails(id);
    generatePhotoThumbs(id);
    const thumbs = document.querySelector('.slider__thumbs') as HTMLDivElement;
    const addToCartBtn = document.querySelector('.btn_details-add') as HTMLButtonElement;
    const buyNowBtn = document.querySelector('.btn_details-buy') as HTMLButtonElement;
    handleButtonState(id);
    addToCartBtn.addEventListener('click', () => {
      buttonHandler(id);
    });
    buyNowBtn.addEventListener('click', () => buyNow(id));
    thumbs.addEventListener('click', changePhoto)
  }
}
function changePhoto(e: Event): void {
  const mainPhoto = document.querySelector('.slider__big-photo') as HTMLImageElement;
  const target = e.target as HTMLImageElement;
  const thumb = target.closest('.slider__item');
  if (thumb) {
    const img = thumb.querySelector('img') as HTMLImageElement;
    mainPhoto.src = img.src;
  }
}

function handleButtonState(id: string): void {
  const addToCartBtn = document.querySelector('.btn_details-add') as HTMLButtonElement;
  if (cart.getBasket().find((item) => item.id === id)) {
    addToCartBtn.textContent = 'Delete from cart';
  } else {
    addToCartBtn.textContent = 'Add to cart';
  }
}

function buttonHandler(id: string): void {
  const addToCartBtn = document.querySelector('.btn_details-add') as HTMLButtonElement;
  if (cart.getBasket().find((item) => item.id === id)) {
    deleteFromCart.call(addToCartBtn);
    if (cart.getBasket().find((item) => item.id === id)) {
      addToCartBtn.textContent = 'Delete from cart';
    } else {
      addToCartBtn.textContent = 'Add to cart';
    }
  } else {
    addToCart.call(addToCartBtn);
    addToCartBtn.textContent = 'Delete from cart';
  }
}

function buyNow(id: string): void {
  if (!cart.getBasket().find((item) => item.id === id)) cart.addToCart(id);
  renderItemsCount();
  renderTotalSum();
  goToCartPage();
  togglePaymentWindow();
  payment();
}

function addToCart(this: HTMLButtonElement): void {
  let id: string = this.getAttribute('data-id') as string;
  cart.addToCart(id);
  renderItemsCount();
  renderTotalSum();
}
function deleteFromCart(this: HTMLButtonElement): void {
  let id: string = this.getAttribute('data-id') as string;
  cart.decreaseItemAmount(id);
  renderItemsCount();
  renderTotalSum();
}

function generatePhotoThumbs(id:string): void {
  const slider = document.querySelector('.slider__thumbs') as HTMLDivElement;
  const resultFragment: DocumentFragment = document.createDocumentFragment();
  let prod = CATALOGUE.get(id);
  if (prod) {
    prod.images.forEach(image => {
      const itemTemplate = document.querySelector('#thumbnail') as HTMLTemplateElement;
      const itemLayout = itemTemplate.content.cloneNode(true) as HTMLDivElement;
      const fragment: DocumentFragment = document.createDocumentFragment();
      fragment.append(itemLayout)
      const source = fragment.querySelector('.slider__thumb') as HTMLImageElement;
      source.src = `${image}`;
      resultFragment.append(fragment);
    });
    slider.append(resultFragment);
  }
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
    const brandDesc = fragment.querySelector('.breadcrumbs__item_brand') as HTMLDivElement;
    brandDesc.textContent = `${prod.brand}`;
    const modelDesc = fragment.querySelector('.details__heading') as HTMLDivElement;
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
    const brand = fragment.querySelector('.details__item_brand') as HTMLDivElement;
    brand.textContent = `${prod.brand}`;
    const category = fragment.querySelector('.details__item_category') as HTMLDivElement;
    category.textContent = `${prod.category}`;
    const photo = fragment.querySelector('.slider__big-photo') as HTMLImageElement;
    photo.src = `${prod.images[0]}`;
    // const thumbs = fragment.querySelectorAll('.slider__thumb) as HTMLImageElement;
    // thumbs.src = `${prod.description}`;
    const price = fragment.querySelector('.details__price') as HTMLDivElement;
    price.textContent = `$ ${prod.price}`;
  }
   body.replaceChild(fragment, main);
}
