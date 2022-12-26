import { filterByCategoryContainer, asideFilters } from './generateFilters';
import { IsCheckedFilterCategory, Data } from '../../types/interfaces';
import { generationCardItems, sectionGoods, sendRequest } from '../generate-card/generateCardItems';
import { urlData } from './getDataForFilters';

export const isCheckedFilterCategory = {
  smartphones: false,
  smartwatch: false,
  tablets: false,
  headphones: false,
  laptops: false,
  apple: false,
  samsung: false,
  xiaomi: false,
  honor: false,
  huawei: false,
  amazfit: false,
  jbl: false,
  asus: false,
  hp: false,
};

asideFilters?.addEventListener('click', (event) => {
  let target = event.target as HTMLInputElement;
  if (target.type === 'checkbox') {
    for (let key in isCheckedFilterCategory) {
      if (key === target.getAttribute('id')) {
        isCheckedFilterCategory[key as keyof IsCheckedFilterCategory] = target.checked;
      }
    }
    while (sectionGoods?.childNodes.length !== 0) {
      sectionGoods?.firstChild?.remove();
    }
    sendRequest(urlData)
      .then((data: Array<Data>) => generationCardItems(data))
      .catch((err) => console.log(err));
  }
});
