import { CATALOGUE } from '../checkout/Cart';
import goToCartPage, { renderItemsCount, renderTotalSum } from '../cart/renderCart';
import { cart } from '../checkout/checkout';
import { payment } from '../payment/render-payment';
import { togglePaymentWindow } from '../cart/promocodes/promocodes';
import htmlGenerator from '../utils/htmlgenerator';


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

function generatePhotoThumbs(id: string): void {
  const SLIDER = document.querySelector('.slider__thumbs') as HTMLDivElement;
  const PRODUCT = CATALOGUE.get(id);
  if (PRODUCT) {
    const ITEM_LAYOUT = PRODUCT.images
    .map(
      (image) =>
      `<li class="slider__item">
      <img class="slider__thumb" src="${image}" alt="thumnail" />
    </li>`
      )
      .join('');
      htmlGenerator(ITEM_LAYOUT, SLIDER);
    }
  }
  
  function generateDetails(id: string): void {
    const body = document.querySelector('.body') as HTMLDivElement;
    const main = document.querySelector('.main') as HTMLDivElement;
    const product = CATALOGUE.get(id);
    if (product) {
      const itemTemplate = ` <main class="main">
      <section class="details wrapper">
      <ul class="breadcrumbs">
      <li class="breadcrumbs__item">Main</li>
      <li class="breadcrumbs__item breadcrumbs__item_arrows">>></li>
      <li class="breadcrumbs__item breadcrumbs__item_category">${product.category}</li>
      <li class="breadcrumbs__item breadcrumbs__item_arrows">>></li>
      <li class="breadcrumbs__item breadcrumbs__item_brand">${product.brand}</li>
      <li class="breadcrumbs__item breadcrumbs__item_arrows">>></li>
      <li class="breadcrumbs__item breadcrumbs__item_model">${product.title}</li>
      </ul>
      <h2 class="details__heading">Iphone 14</h2>
      <div class="details__container">
      <div class="details__block">
      <ul class="details_info">
      <li class="details__list">
      <h3 class="details__item-heading">Description</h3>
      <div class="details__item details__item_description">${product.description}</div>
      </li>
      <li class="details__list">
      <h3 class="details__item-heading">Discount Percentage:</h3>
      <div class="details__item details__item_discount">${product.discountPercentage}</div>
      </li>
      <li class="details__list">
      <h3 class="details__item-heading">Rating:</h3>
      <div class="details__item details__item_rating">${product.rating}</div>
      </li>
      <li class="details__list">
      <h3 class="details__item-heading">Stock:</h3>
      <div class="details__item details__item_stock">${product.stock}</div>
      </li>
      <li class="details__list">
      <h3 class="details__item-heading">Brand:</h3>
      <div class="details__item details__item_brand">${product.brand}</div>
      </li>
      <li class="details__list">
      <h3 class="details__item-heading">Category:</h3>
      <div class="details__item details__item_category">${product.category}</div>
      </li>
      </ul>
      </div>
      <div class="slider">
      <ul class="slider__thumbs"></ul>
      <div class="slider__photo">
      <img class="slider__big-photo" src="${product.images[0]}" alt="thumnail" />
      </div>
      </div>
      <div class="priceblock">
      <button class="btn btn_details-add" data-id="${product.id}">Add to cart</button>
      <button class="btn btn_details-buy" data-id="${product.id}">Buy now</button>
      <div class="details__price">$ ${product.price}</div>
        </div>
        </div>
        </section>
        </main>`;
        htmlGenerator(itemTemplate, body, main);
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
  const id: string = this.getAttribute('data-id') as string;
  cart.addToCart(id);
  renderItemsCount();
  renderTotalSum();
}

function deleteFromCart(this: HTMLButtonElement): void {
  const id: string = this.getAttribute('data-id') as string;
  cart.decreaseItemAmount(id);
  renderItemsCount();
  renderTotalSum();
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
    thumbs.addEventListener('click', changePhoto);
  }
}

const goods = document.querySelector('.goods') as HTMLDivElement;
goods.addEventListener('click', openDetailsPage);
