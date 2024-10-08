import { render, screen } from '@testing-library/react';
import App from './App.tsx';
import { MemoryRouter } from 'react-router-dom';
import Home from "./pages/Home/home";
import { paths } from "./utils/paths";
import { MyContextProvider } from "./contextProvider/context";

jest.mock('./pages/Home/home', () => () => <div>Home Page</div>);
jest.mock('./pages/ProductDetails/productDetails', () => () => <div>Product Details</div>);
jest.mock('./pages/Cart/cart',()=>()=><div>Cart Details</div>)
describe('App Component', () => {
  test('should render Home component for the root path', () => {
      render(
          <MyContextProvider>
      <MemoryRouter initialEntries={[paths.home]}>
        <App />
              </MemoryRouter>
              </MyContextProvider>
    );

    // Check if the Home component is rendered
  expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
    
    
    test('should render Product Details', () => {
        render(
                <MyContextProvider>
      <MemoryRouter initialEntries={[`${paths.details}/1`]}>
        <App />
              </MemoryRouter>
              </MyContextProvider>
        )

        expect(screen.getByText('Product Details')).toBeInTheDocument();
    })

    test('should render Cart Details', () => {
        render(
               <MyContextProvider>
      <MemoryRouter initialEntries={[paths.cart]}>
        <App />
              </MemoryRouter>
              </MyContextProvider>
        )

        expect(screen.getByText('Cart Details')).toBeInTheDocument();
    })
});