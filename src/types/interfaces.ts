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
  images: [string];
}

export interface Icatalogue {
  products: IproductItem[];
}

export default IbasketItem;
