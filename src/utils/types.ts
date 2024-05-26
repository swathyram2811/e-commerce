import { ReactNode } from "react";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number | any; count: number };
  totalCount: number;
}

export interface IMyContextType {
  products: IProduct[];
  searchQuery: string;
  searchResults: IProduct[];
  selectedCategory: string;
  cartLen: number;
  setProducts: (prods: IProduct[]) => void;
  setSearchResults: (prods: IProduct[]) => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setCartLen: React.Dispatch<React.SetStateAction<number>>;
}

export interface IMyContextProviderProps {
  children: ReactNode;
}
