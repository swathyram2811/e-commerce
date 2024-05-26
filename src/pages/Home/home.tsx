import React from "react";
import { useNavigate } from "react-router-dom";

import "./home.scss";

import { IProduct } from "../../utils/types";
import { addToCart, getCartInStore } from "../../store/localStorage";
import { useMyContext } from "../../contextProvider/context";

import ProductImage from "../../components/ProductImage/productImage";
import ProductCategory from "../../components/ProductCategory/productCategory";
import ProductRating from "../../components/ProductRating/productRating";
import ProductPrice from "../../components/ProductPrice/productPrice";

const Home: React.FC = () => {
  const { products, searchQuery, selectedCategory, searchResults, setCartLen } =
    useMyContext();
  const isQueryEnabled = searchQuery || selectedCategory !== "all";
  const displayProducts = isQueryEnabled ? searchResults : products;

  const navigate = useNavigate();

  const viewProduct = (product: IProduct) => {
    navigate(`/product/${product?.id}`);
  };

  const isProdAddedToCart = (productId: number) => {
    const data = getCartInStore();
    return data?.find((prod) => prod?.id === productId);
  };

  if (!displayProducts?.length && isQueryEnabled) {
    return (
      <section className="no-product-found">
        <h2>No Results found for searched query!</h2>
      </section>
    );
  }

  return (
    <div className="cards-container">
      {displayProducts?.map((product: IProduct) => {
        return (
          <article className="card" key={product?.id}>
            <ProductImage
              imageSrc={product?.image}
              title={product?.title}
              showProduct={() => viewProduct(product)}
            />
            <section className="card-content">
              <ProductCategory category={product?.category} />
              <ProductRating
                rating={product?.rating?.rate}
                count={product?.rating?.count}
              />
              <h2 className="product-name" onClick={() => viewProduct(product)}>
                {product?.title}
              </h2>
              <ProductPrice price={product?.price} />
              <button
                className="add-to-basket"
                onClick={() => setCartLen(addToCart(product))}
                disabled={!!isProdAddedToCart(product?.id)}
              >
                {!!isProdAddedToCart(product?.id)
                  ? "Added to Cart"
                  : "Add to Cart"}
              </button>
            </section>
          </article>
        );
      })}
    </div>
  );
};

export default Home;
