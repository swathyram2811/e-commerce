import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./cart.scss";

import { IProduct } from "../../utils/types";
import { getCartInStore, updateCartInStore } from "../../store/localStorage";
import { useMyContext } from "../../contextProvider/context";
import ProductCount from "../../components/ProductCount/productCount";
import ProductImage from "../../components/ProductImage/productImage";
import ProductPrice from "../../components/ProductPrice/productPrice";

const Cart: React.FC = () => {
  const { setCartLen } = useMyContext();
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCartInStore());
  }, []);

  const countHandler = (count: number, productId: number) => {
    const updatedCart = cartItems?.map((item) => {
      if (item?.id === productId) {
        item.totalCount = count;
      }
      return item;
    });
    updateCartInStore(updatedCart);
    setCartItems(updatedCart);
  };

  const deleteHandler = (id: number) => {
    let filteredData = cartItems?.filter((item) => item?.id !== id);
    // update the cart in store and update the cart length in the context
    setCartLen(updateCartInStore(filteredData));
    setCartItems(filteredData);
  };

  const getTotalPrice = () => {
    const allPrices = cartItems?.map((item) => item?.price * item.totalCount);
    return allPrices?.reduce((a, b) => a + b, 0);
  };

  if (!cartItems?.length) {
    return (
      <section className="no-product-found">
        <h2>Your shopping cart is empty!</h2>
      </section>
    );
  }

  return (
    <section className="cart">
      <div className="shopping-cart">
        <header>
          <h1>Shopping venture</h1>
        </header>
        <section className="cart-item">
          {cartItems?.map((product) => (
            <article className="item" key={product?.id}>
              <div
                className="item-image"
                onClick={() => navigate(`/product/${product?.id}`)}
              >
                <ProductImage
                  imageSrc={product?.image}
                  title={product?.title}
                />
              </div>
              <div className="item-details">
                <h2 onClick={() => navigate(`/product/${product?.id}`)}>
                  {product?.title}
                </h2>

                <div className="item-actions">
                  <ProductCount
                    initialCount={product?.totalCount}
                    onChange={(count) => countHandler(count, product?.id)}
                  />
                  |
                  <span
                    className="item-del"
                    onClick={() => deleteHandler(product?.id)}
                  >
                    Delete
                  </span>
                </div>
              </div>
              <div className="item-price">
                <ProductPrice price={product?.price * product?.totalCount} />
              </div>
            </article>
          ))}
          <div className="total-price">
            <span className="price-txt">Total Price: </span>
            <ProductPrice price={getTotalPrice()} />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Cart;
