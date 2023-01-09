import { buttonSizeView } from '../../const/const';
import { IStatusValueButton } from '../../types/interfaces';
import { generationStringRouting } from '../routing/routing';

export const statusValueButton: IStatusValueButton = {
  max: true,
  min: false,
};

export const changeSizeItems = (): void => {
  const cardItems = document.querySelectorAll('.sku__container');
  window.location.hash = generationStringRouting();
  cardItems.forEach((itemCard) => {
    if (statusValueButton.max) {
      itemCard.classList.remove('sku__container-min');
    }
    if (statusValueButton.min) {
      itemCard.classList.add('sku__container-min');
    }
  });
};

const changeStatusValueButton = (): void => {
  if (statusValueButton.min) {
    statusValueButton.min = false;
    statusValueButton.max = true;
  } else {
    statusValueButton.min = true;
    statusValueButton.max = false;
  }
};

const addStatusValueInButton = (statusButton: IStatusValueButton): void => {
  const keysStatusButton = Object.keys(statusButton);
  keysStatusButton.forEach((key) => {
    const keyStatusButton = key as keyof IStatusValueButton;
    if (statusButton[keyStatusButton]) {
      buttonSizeView.innerText = `Size view ${keyStatusButton}`;
    }
  });
};

buttonSizeView.addEventListener('click', () => {
  changeStatusValueButton();
  addStatusValueInButton(statusValueButton);
  changeSizeItems();
});
