import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { paths } from "./utils/paths";
import { fetchProducts } from "./apis/fetchProducts";
import { useMyContext } from "./contextProvider/context";

import "./App.css";

import Home from "./pages/Home/home";
import ProductDetails from "./pages/ProductDetails/productDetails";
import Cart from "./pages/Cart/cart";

const App: React.FC = () => {
  const { setProducts } = useMyContext();

  useEffect(() => {
    (async () => {
      const data = await fetchProducts();
      if (data) {
        setProducts(data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
//app
  return (
    <Routes>
      <Route path={paths.home} element={<Home />} />
      <Route path={`${paths.details}/:id`} element={<ProductDetails />} />
      <Route path={paths.cart} element={<Cart />} />
    </Routes>
  );
};

export default App;
