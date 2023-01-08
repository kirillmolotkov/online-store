import { IDismantledAdrressBar } from '../../types/interfaces';

export const parsingAdrressBar = () => {
  const adrressString = window.location.hash.slice(1);
  const arrayString = adrressString.split('&');
  const newArrayString = arrayString.map((elem) => {
    const arr = [];
    arr.push(elem.split('='));
    return arr;
  });
  const dismantledAdrressBar: IDismantledAdrressBar = {};

  if (newArrayString[0][0].length !== 1) {
    newArrayString.forEach((elem) => {
      dismantledAdrressBar[elem[0][0]] = elem[0][1].split('-');
    });
  }
  return dismantledAdrressBar;
};
