import { Product } from "../products/productTypes";

// A CartItem is a Product + how many the user added
export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean; // sidebar open/close
}
