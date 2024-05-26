import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./productDetails.scss";

import { IProduct } from "../../utils/types";
import { addToCart, getCartInStore } from "../../store/localStorage";
import { useMyContext } from "../../contextProvider/context";

import ProductRating from "../../components/ProductRating/productRating";
import ProductImage from "../../components/ProductImage/productImage";
import ProductPrice from "../../components/ProductPrice/productPrice";

const ProductDetails: React.FC = () => {
  const { products, setCartLen } = useMyContext();
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();

  const { id } = useParams();

  useEffect(() => {
    const product = products?.find((product) => product?.id === Number(id));
    setSelectedProduct(product);
  }, [id, products]);

  const isProdAddedToCart = (productId: number) => {
    const data = getCartInStore();
    return data?.find((prod) => prod?.id === productId);
  };

  if (!selectedProduct) {
    return (
      <section className="no-product-found">
        <h2>Selected product id "{id}" not found!</h2>
      </section>
    );
  }

  return (
    <section className="prod-container">
      <header>
        <h1 className="center-align">Product Details</h1>
      </header>

      <article className="prod-content">
        <ProductImage
          imageSrc={selectedProduct?.image}
          title={selectedProduct?.title}
        />
        <section className="prod-details">
          <h2 className="prod-details-title">{selectedProduct?.title}</h2>
          <ProductRating
            rating={selectedProduct?.rating?.rate}
            count={selectedProduct?.rating?.count}
          />
          <ProductPrice price={selectedProduct?.price} />
          <p>{selectedProduct?.description}</p>
          <button
            className="add-to-basket"
            onClick={() => setCartLen(addToCart(selectedProduct))}
            disabled={!!isProdAddedToCart(selectedProduct?.id)}
          >
            {!!isProdAddedToCart(selectedProduct?.id)
              ? "Added to Cart"
              : "Add to Cart"}
          </button>
        </section>
      </article>
    </section>
  );
};

export default ProductDetails;
