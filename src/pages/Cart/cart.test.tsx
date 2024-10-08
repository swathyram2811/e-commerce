import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../contextProvider/context';
import { getCartInStore ,updateCartInStore} from '../../store/localStorage';
import Cart from './cart';
import '@testing-library/jest-dom/extend-expect';
import { exec } from 'child_process';

//Mocking dependencies
jest.mock('react-router-dom', () => ({
    useNavigate:jest.fn(),
}))

jest.mock('../../contextProvider/context', () => ({
    useMyContext:jest.fn()
}))

jest.mock('../../store/localStorage', () => ({
    getCartInStore: jest.fn(),
    updateCartInStore: jest.fn()
}))



describe('Cart Component', () => {
    const mockNavigate = jest.fn();
    const mockSetCartLen = jest.fn();

    const mockCartItems = [
      {
        id: 1,
        title: "Product 1",
        image: "image1.jpg",
        
        price: 29.99,
        totalCount: 1,
      },
      {
        id: 2,
        title: "Product 2",
        image: "image2.jpg",
        price: 59.99,
        totalCount: 12,
      },
    ];
    
    beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useMyContext as jest.Mock).mockReturnValue({
      setCartLen: mockSetCartLen,
  
    });
    (getCartInStore as jest.Mock).mockReturnValue(mockCartItems);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


    test('renders no Items in Cart if empty', () => {
        (getCartInStore as jest.Mock).mockReturnValue([])
        render(<Cart />)
        expect(screen.getByText('Your shopping cart is empty!')).toBeInTheDocument();
    })
    
    test('renders the cartItems correctly', () => {
        render(<Cart />)
        expect(screen.getByText('Product 1')).toBeInTheDocument();
    })


    test('navigates to product details correctly', () => {
        render(<Cart />);
        fireEvent.click(screen.getByText('Product 1'));
        expect(mockNavigate).toHaveBeenCalledWith('/product/1')
    })


  test("update the product count when count is changed", () => {
    render(<Cart />);
    const countInput = screen.getByDisplayValue('12');
    fireEvent.change(countInput, { target: { value: '3' } });
    expect(updateCartInStore).toHaveBeenCalledWith(
       [{
        id: 1,
        title: "Product 1",
        image: "image1.jpg",
        
        price: 29.99,
        totalCount: 1,
      },
      {
        id: 2,
        title: "Product 2",
        image: "image2.jpg",
        price: 59.99,
        totalCount: 3,
      }]
    );
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  })
  
  test("removes item from the cart when delete button is clicked", () => {
    render(<Cart />);
    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(updateCartInStore).toHaveBeenCalledWith([
      {
        id: 2,
        title: "Product 2",
        image: "image2.jpg",
        price: 59.99,
        totalCount: 3,
      },
    ]);
    expect(mockSetCartLen).toHaveBeenCalled();
    expect(screen.queryByText('Product 1')).toBeNull();
  })

})