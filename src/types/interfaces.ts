<<<<<<< HEAD
export interface basketItem{
  id: number;
  amount: number;
  }

export interface productItem{
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [string];
}

export default basketItem;
=======
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
>>>>>>> 6cd857b3f39df55a7e346255b35a4e4fcffaed58
