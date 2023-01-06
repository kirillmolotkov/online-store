import { buttonSizeView } from '../../const/const';
import { IsCheckedFilterBrand, IStatusValueButton } from '../../types/interfaces';

export const statusValueButton: IStatusValueButton = {
  max: true,
  min: false,
};

buttonSizeView.addEventListener('click', () => {
  changeStatusValueButton();
  addStatusValueInButton(statusValueButton);
  changeSizeItems();
});

export const changeSizeItems = function () {
  const cardItems = document.querySelectorAll('.sku__container');

  cardItems.forEach((itemCard) => {
    if (statusValueButton.max) {
      itemCard.classList.remove('sku__container-min');
    }
    if (statusValueButton.min) {
      itemCard.classList.add('sku__container-min');
    }
  });
};

const changeStatusValueButton = function () {
  if (statusValueButton.min) {
    statusValueButton.min = false;
    statusValueButton.max = true;
  } else {
    statusValueButton.min = true;
    statusValueButton.max = false;
  }
};

const addStatusValueInButton = function (statusButton: IStatusValueButton) {
  for (let key in statusButton) {
    const status = key as keyof IStatusValueButton;
    if (statusButton[status]) buttonSizeView.innerText = `Size view ${status}`;
  }
};
