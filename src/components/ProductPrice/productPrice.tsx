import React from "react";

import "./productPrice.scss";

const ProductPrice: React.FC<{ price: number }> = ({ price }) => {
  return (
    <span className="price-wrapper">
      <span className="currency">€</span>
      <span className="product-price"> {price.toFixed(2)}</span>
    </span>
  );
};

export default ProductPrice;
