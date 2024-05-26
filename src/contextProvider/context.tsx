// src/MyContext.tsx
import React, { createContext, useState, useContext } from "react";
import {
  IMyContextProviderProps,
  IMyContextType,
  IProduct,
} from "../utils/types";

const MyContext = createContext<IMyContextType | undefined>(undefined);

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

const MyContextProvider: React.FC<IMyContextProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [cartLen, setCartLen] = useState<number>(0);

  return (
    <MyContext.Provider
      value={{
        products,
        searchQuery,
        searchResults,
        selectedCategory,
        cartLen,
        setProducts,
        setSearchResults,
        setSearchQuery,
        setSelectedCategory,
        setCartLen,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider, useMyContext };
