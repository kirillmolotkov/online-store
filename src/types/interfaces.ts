export interface Data {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: string;
  rating: string;
  stock: string;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}
export interface TempalateForCardItem {
  container: HTMLDivElement;
  title: HTMLHeadElement;
  image: HTMLImageElement;
  info: HTMLDivElement;
  description: {
    category: HTMLSpanElement;
    brand: HTMLSpanElement;
    discount: HTMLSpanElement;
    rating: HTMLSpanElement;
    stock: HTMLSpanElement;
  };
  buttonAddToCart: HTMLButtonElement;
  buttonDetails: HTMLButtonElement;
  price: HTMLSpanElement;
}

export interface IbasketItem {
  id: string;
  amount: number;
}

export interface IproductItem {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Icodes {
  code: string;
  discount: number;
}

export interface IValidate{
  fullName: boolean;
  adress: boolean;
  phoneNumber: boolean;
  email: boolean;
  cvv: boolean;
  cardNumber: boolean;
  expiration: boolean;
}

export default IbasketItem;
