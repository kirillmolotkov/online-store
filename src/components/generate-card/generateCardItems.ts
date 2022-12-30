import { Data } from '../../types/interfaces';
import { TempalateForCardItem } from '../../types/interfaces';

const urlData: string = '../../data/data.json';
const sectionGoods = document.querySelector('.goods');

function sendRequest(url: string) {
  return fetch(url).then((response) => {
    return response.json();
  });
}

const generationCardItems = function (data: Array<Data>) {
  data.forEach((elem) => {
    generateHTML(elem);
  });
};

const generateHTML = (products: Data) => {
  const template: TempalateForCardItem = {
    container: document.createElement('div'),
    title: document.createElement('h3'),
    image: document.createElement('img'),
    info: document.createElement('div'),
    description: {
      category: document.createElement('span'),
      brand: document.createElement('span'),
      discount: document.createElement('span'),
      rating: document.createElement('span'),
      stock: document.createElement('span'),
    },
    buttonAddToCart: document.createElement('button'),
    buttonDetails: document.createElement('button'),
    price: document.createElement('span'),
  };

  template.container.className = 'sku__container';

  template.title.className = 'sku__name';
  template.title.innerText = products.title;

  template.image.className = 'sku__photo-slider';
  template.image.src = products.thumbnail;

  template.info.className = 'sku__info';

  template.description.brand.className = 'sku__description_brand';
  template.description.brand.innerText = `Brand: ${products.brand}`;

  template.description.category.className = 'sku__description_category';
  template.description.category.innerText = `Catagory: ${products.category}`;

  template.description.discount.className = 'sku__description_discount';
  template.description.discount.innerText = `Discount: ${products.discountPercentage} %`;

  template.description.rating.className = 'sku__description_rating';
  template.description.rating.innerText = `Rating: ${products.rating}`;

  template.description.stock.className = 'sku__description_stock';
  template.description.stock.innerText = `Stock: ${products.stock}`;

  template.buttonAddToCart.className = 'sku__button_add-to-card';
  template.buttonAddToCart.innerText = 'Add to cart';
  template.buttonAddToCart.dataset.id = products.id;

  template.buttonDetails.className = 'sku__button_details';
  template.buttonDetails.innerText = 'Details';
  template.buttonDetails.dataset.id = products.id;

  template.price.className = 'sku__price';
  template.price.innerHTML = `$ ${products.price}`;

  template.info.append(
    template.description.brand,
    template.description.category,
    template.description.discount,
    template.description.rating,
    template.description.stock
  );

  template.container.append(
    template.title,
    template.image,
    template.info,
    template.buttonAddToCart,
    template.buttonDetails,
    template.price
  );

  if (sectionGoods) sectionGoods.append(template.container);
};

sendRequest(urlData)
  .then((data: Array<Data>) => generationCardItems(data))
  .catch((err) => console.log(err));
