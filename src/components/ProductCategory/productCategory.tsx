import React from "react";

import "./productCategory.scss";

const ProductCategory: React.FC<{ category: string }> = ({ category }) => {
  return (
    <div className="category-tags">
      <span className="category-tag">{category?.toUpperCase()}</span>
    </div>
  );
};

export default ProductCategory;
