import React from "react";

import "./productImage.scss";

const ProductImage: React.FC<{
  imageSrc: string;
  title: string;
  showProduct?: () => void;
}> = ({ imageSrc, title, showProduct }) => {
  return (
    <div className="img-wrapper">
      <img
        src={imageSrc}
        alt={title}
        className="product-image"
        onClick={showProduct}
      />
    </div>
  );
};

export default ProductImage;
