export interface Data {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: string;
  rating: string;
  stock: number;
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

export interface QuantityOfGoodsByCategory {
  smartphones: number;
  smartwatch: number;
  tablets: number;
  headphones: number;
  laptops: number;
}

export interface IsCheckedFilterCategory {
  smartphones: boolean;
  smartwatch: boolean;
  tablets: boolean;
  headphones: boolean;
  laptops: boolean;
}
export interface IsCheckedFilterBrand {
  apple: boolean;
  samsung: boolean;
  xiaomi: boolean;
  honor: boolean;
  huawei: boolean;
  amazfit: boolean;
  jbl: boolean;
  asus: boolean;
  hp: boolean;
}

export interface QuantityOfGoodsByBrand {
  apple: number;
  samsung: number;
  xiaomi: number;
  honor: number;
  huawei: number;
  amazfit: number;
  jbl: number;
  asus: number;
  hp: number;
}
export interface QuantityOfGoodsByPriceAndStock {
  priceMin: number;
  priceMax: number;
  stockMin: number;
  stockMax: number;
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

export default IbasketItem;

export interface IStatusValueButton {
  max: boolean;
  min: boolean;
}
