
import { useMyContext } from "../../contextProvider/context";
import { getCartInStore } from "../../store/localStorage";
import ProductDetails from './productDetails';
import { render,screen,fireEvent } from "@testing-library/react";
import { useParams } from 'react-router-dom';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams:jest.fn()
}))

jest.mock("../../components/ProductImage/productImage",()=>()=><div>Product Image</div>);
jest.mock("../../components/ProductRating/productRating", ()=>()=> <div>Product Rating</div>);
jest.mock("../../components/ProductPrice/productPrice",()=>()=><div>Product Price</div>);

jest.mock('../../contextProvider/context', () => ({
    useMyContext:jest.fn()
}))

jest.mock('../../store/localStorage', () => ({
    getCartInStore: jest.fn(),
    addToCart:jest.fn()
}))


describe('ProductDetails Component', () => {
    const mockSetCartLen = jest.fn();

const mockCartData = [
  {
    id: 1,
    title: "Test Product",
    image: "test-image.jpg",
    description: "Test description",
    price: 100,
    rating: { rate: 4.5, count: 10 },
  },
];
    
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({ id: '1' });
            (useMyContext as jest.Mock).mockReturnValue({
              products: mockCartData,
              setCartLen: mockSetCartLen,
            });
    })
    afterEach(() => {
        jest.clearAllMocks();
})
 

  test("should render the product details correctly", () => {
    render(<ProductDetails />);

    expect(screen.getByText("Product Details")).toBeInTheDocument();
    expect(screen.getByText("Product Image")).toBeInTheDocument();
    expect(screen.getByText("Product Rating")).toBeInTheDocument();
    expect(screen.getByText("Product Price")).toBeInTheDocument();
  });

    test("should display the add Cart button when not added", () => {
        render(<ProductDetails />);
        expect(screen.getByText("Add to Cart")).toBeInTheDocument();

    })

    test("should add the product to cart when add to cart is clicked", () => {
        render(<ProductDetails />);
        fireEvent.click(screen.getByText("Add to Cart"));
        expect(mockSetCartLen).toHaveBeenCalled();
    })

    test("should show Added to Cart button when it is already added to cart", () => {
        (getCartInStore as jest.Mock).mockReturnValue(mockCartData);
        render(<ProductDetails />);
        expect(screen.getByText("Added to Cart"))

    })
  
    test("should display product not found when product does not exist", () => {
        (useMyContext as jest.Mock).mockReturnValue({ products: [], mockSetCartLen: mockSetCartLen });
        render(<ProductDetails />);
        expect(screen.getByText('Selected product id "1" not found!')).toBeInTheDocument();
    })

})