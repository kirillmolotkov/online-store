import './style.scss';
import './types/interfaces.ts';
import './components/generate-card/generateCardItems.ts';
import './components/filters/generateFilters.ts';
import './components/generate-card/startApp';
import './components/filters/useFilters.ts';
import './components/checkout/checkout';
import './components/cart/renderCart';
import './components/header-main/changeSizeItems';
import './components/header-main/searchProducts';
import './components/header-main/sortOptions';
import './components/routing/routing';
import './components/routing/parsingAdrressBar';
import goToCartPage from './components/cart/renderCart';
import promo from './components/cart/promocodes/promocodes';
import './components/details/renderdetails'

const cartIcon = document.querySelector('.header__basket') as HTMLDivElement;
cartIcon.addEventListener('click', () => {
  goToCartPage();
  setTimeout(() => promo(), 100);
});
