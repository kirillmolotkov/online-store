import './style.scss';
import './types/interfaces.ts';
import './components/generate-card/generateCardItems.ts';
import './components/checkout/checkout';
import './components/cart/renderCart'
import goToCartPage from './components/cart/renderCart';

const cartIcon = document.querySelector('.header__basket') as HTMLDivElement;
cartIcon.addEventListener('click', goToCartPage);
