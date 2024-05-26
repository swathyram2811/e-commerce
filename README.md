# React Shopping Cart Application

    This is a simple shopping cart application built with React. It fetches product data from the FakeStore API and allows users to add products to their cart, view product details, and manage their cart. The cart is stored in local storage. The application will run at http://localhost:3000/

## Features
    1.  Fetch products from FakeStore API.
    2.  View product details.
    3.  Add products to the cart.
    4.  View and manage the cart.
    5.  Store cart data in local storage.

## Prerequisites

    Before you begin, ensure you have met the following requirements:

    1.  You have installed the latest version of Node.js and npm.
    2. You have installed Yarn.

    Create a .env.development file in the root directory and add the following:

    REACT_APP_FETCH_PRODUCTS_URL='https://fakestoreapi.com/products'
    REACT_APP_STORAGE_KEY=cartItem

## Available Pages

### Home (/)
    1. Displays a list of products fetched from the API.
    2. Each product card includes an image, name, price, and an "Add to Cart" button.
    
### Product Details (/product/:id)
    1. Displays detailed information about a selected product.
    2. Includes product image, title, rating, price, description, and an "Add to Cart" button.

### Cart (/cart)
    1.  Displays the products added to the cart.
    2.  Allows users to increase/decrease the quantity of each product and delete products from the cart.
    3.  Shows the total price of the products in the cart.

## Local Storage
    The cart data is stored in the local storage with a key named cartItem. This ensures that the cart contents persist even if the page is refreshed or the browser is closed and reopened.
