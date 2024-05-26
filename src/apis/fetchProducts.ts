export const fetchProducts = async () => {
  if (process.env.REACT_APP_FETCH_PRODUCTS_URL) {
    try {
      const response = await fetch(process.env.REACT_APP_FETCH_PRODUCTS_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      // If fetch fails, read data from JSON file
      try {
        const jsonData = await fetch("/constants/products.json");
        const jsonProducts = await jsonData.json();
        return jsonProducts;
      } catch (jsonError) {
        console.error("Error reading data from JSON file:", jsonError);
      }
    }
  }
};
