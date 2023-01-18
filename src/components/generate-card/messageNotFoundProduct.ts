import { sectionGoods } from './generateCardItems';

export const messageNotFoundProduct = (counterFoundProducts: number) => {
  const message = document.createElement('p');

  if (!counterFoundProducts) {
    message.className = 'message-not-found';
    message.innerText = 'Not found products by this filters';
  }
  sectionGoods?.append(message);
};
