import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./header.scss";
import cart from "../../assets/cart.png";
import logo from "../../assets/logo.svg";

import { useMyContext } from "../../contextProvider/context";
import { getCartInStore } from "../../store/localStorage";

const Header: React.FC = () => {
  const {
    products,
    searchQuery,
    cartLen,
    setSearchQuery,
    setSearchResults,
    selectedCategory,
    setSelectedCategory,
  } = useMyContext();

  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = (e.target as HTMLInputElement).value;
      const trimmedQuery = query.trim();
      setSearchQuery(trimmedQuery);
      filterProducts(trimmedQuery, selectedCategory);
      navigateToHome();
    }
  };

  const navigateToHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterProducts(searchQuery, category);
    navigateToHome();
  };

  const filterProducts = (query: string, category: string) => {
    // Filter by search query and category
    const queryWords = query.toLowerCase().split(/\s+/);
    const filtered = products?.filter((product) => {
      const productTitle = product?.title?.toLowerCase();
      const productCategory = product?.category?.toLowerCase();

      const matchesQuery = queryWords.every(
        (word) => productTitle.includes(word) || productCategory.includes(word)
      );

      const matchesCategory =
        category === "all" || product?.category === category;

      return matchesQuery && matchesCategory;
    });
    setSearchResults(filtered);
  };

  const fetchCategories = useCallback(() => {
    const categories = new Set<string>();
    // Extract unique categories from products
    products?.map((product) => categories.add(product?.category));
    setUniqueCategories(Array.from(categories));
  }, [products]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, products]);

  return (
    <header className="top-bar">
      <div className="logo">
        <img src={logo} alt="Logo" onClick={() => navigate("/")} />
      </div>
      <nav className="search-container">
        <form role="search" className="search-container">
          <input
            type="text"
            id="prod-search"
            placeholder="Search any product.."
            className="search-box"
            onKeyUp={handleKeyPress}
          />
          <select
            className="category-filter"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="all">All Categories</option>
            {uniqueCategories?.map((category) => {
              return <option value={category}>{category}</option>;
            })}
          </select>
        </form>
      </nav>
      <div className="cart-icon">
        <img src={cart} alt="Cart" onClick={() => navigate("/cart")} />
        <span className="cart-count">
          {cartLen || getCartInStore()?.length}
        </span>
      </div>
    </header>
  );
};

export default Header;
