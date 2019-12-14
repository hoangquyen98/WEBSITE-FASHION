export class Product {
  id: string;
  productId: string;
  productName: string;
  productCategory: string;
  productPrice: number;
  productDescription: string;
  productImageUrl: string;
  productAdded: number;
  productQuatity: number;
  ratings: number;
  favourite: boolean;
  productSeller: string;
}
export class WishProduct {
  _id: string;
  productId: string;
  productName: string;
  productCategory: string;
  productPrice: number;
  productDescription: string;
  productImageUrl: string;
  productAdded: number;
  productQuatity: number;
  ratings: number;
  favourite: boolean;
  productSeller: string;
}

export interface Category {
  value: string;
}
export interface Added {
  value: string;
  viewValue: string;
}


