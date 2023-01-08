import { urlData } from '../../const/const';
import { Data } from '../../types/interfaces';
import { generationFIlters } from '../filters/generateFilters';

import { generationHeaderMain } from '../header-main/generationHeaderMain';
import { generationCardItems, sendRequest } from './generateCardItems';

sendRequest(urlData)
  .then((data: Array<Data>) => {
    generationFIlters(data);
    generationHeaderMain();
    generationCardItems(data);
  })
  .catch((err) => console.log(err));
