import { fetchProducts } from "./fetchProducts";

global.fetch = jest.fn();

describe("fetch products", () => {
  const mockAPIResponse = [{ id: 1, name: "Product 1" }];
   process.env.REACT_APP_FETCH_PRODUCTS_URL = "https://mock-api.com/products";
  beforeEach(() => {
  jest.clearAllMocks()
  })
  
  test("should fetch products from API successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json:jest.fn().mockResolvedValueOnce(mockAPIResponse)
    })
    const result = await fetchProducts();
    expect(fetch).toHaveBeenCalledWith(
      process.env.REACT_APP_FETCH_PRODUCTS_URL
    );
    expect(result).toEqual(mockAPIResponse);

  })

})








// // Mocking `fetch` globally
// global.fetch = jest.fn();

// describe("fetchProducts", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("should fetch products from API successfully", async () => {
//     // Mock the API response
//     const mockApiResponse = [{ id: 1, name: "Product 1" }];
//     process.env.REACT_APP_FETCH_PRODUCTS_URL = "https://mock-api.com/products";
//     (fetch as jest.Mock).mockResolvedValueOnce({
//       json: jest.fn().mockResolvedValueOnce(mockApiResponse),
//     });

//     const result = await fetchProducts();

//     expect(fetch).toHaveBeenCalledWith(
//       process.env.REACT_APP_FETCH_PRODUCTS_URL
//     );
//     expect(result).toEqual(mockApiResponse);
//   });

//   test("should fallback to JSON file if API fails", async () => {
//     // Mock the failed API response and successful JSON fallback
//     process.env.REACT_APP_FETCH_PRODUCTS_URL = "https://mock-api.com/products";

//     // First fetch for API (failed)
//     (fetch as jest.Mock).mockRejectedValueOnce(new Error("API fetch failed"));

//     // Second fetch for JSON (succeeds)
//     const mockJsonResponse = [{ id: 2, name: "Product from JSON" }];
//     (fetch as jest.Mock).mockResolvedValueOnce({
//       json: jest.fn().mockResolvedValueOnce(mockJsonResponse),
//     });

//     const result = await fetchProducts();

//     expect(fetch).toHaveBeenCalledTimes(2);
//     expect(fetch).toHaveBeenCalledWith("/constants/products.json");
//     expect(result).toEqual(mockJsonResponse);
//   });

//   test("should log an error if both API and JSON fetch fail", async () => {
//     // Mock both API and JSON fetch failures
//     process.env.REACT_APP_FETCH_PRODUCTS_URL = "https://mock-api.com/products";

//     const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();

//     (fetch as jest.Mock).mockRejectedValueOnce(new Error("API fetch failed"));
//     (fetch as jest.Mock).mockRejectedValueOnce(new Error("JSON fetch failed"));

//     const result = await fetchProducts();

//     expect(fetch).toHaveBeenCalledTimes(2);
//     expect(consoleErrorMock).toHaveBeenCalledWith(
//       "Error fetching products:",
//       expect.any(Error)
//     );
//     expect(consoleErrorMock).toHaveBeenCalledWith(
//       "Error reading data from JSON file:",
//       expect.any(Error)
//     );
//     expect(result).toBeUndefined(); // No data returned

//     consoleErrorMock.mockRestore();
//   });
// });
