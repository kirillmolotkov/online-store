import { headerMain } from '../../const/const';
import { sectionGoods } from '../generate-card/generateCardItems';

export const generaeteHeaderMain = function () {
  headerMain.className = 'goods__header';
  sectionGoods?.append(headerMain);
};
