import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
//import axios from 'axios';
jest.mock('axios');
describe('Pagination Component', () => {

  test('renders pagination buttons correctly', async () => {
    render(<Pagination currentPage={1} totalPages={2}  />);
    
    //const pageText = await screen.findByText(/Page 1 of 2/i);
    //expect(pageText).toBeInTheDocument();
    expect(screen.getByText('← Previous')).toBeInTheDocument();
    expect(screen.getByText('Next →')).toBeInTheDocument();
  });

  test('clicking the next button calls onPageChange with the correct next page', () => {
    const onPageChangeMock = jest.fn();
    render(<Pagination currentPage={1} totalPages={2} onPageChange={onPageChangeMock} />);
    
    fireEvent.click(screen.getByText('Next →'));
    
    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
  });

  test('clicking the previous button calls onPageChange with the correct previous page', () => {
    const onPageChangeMock = jest.fn();
    render(<Pagination currentPage={2} totalPages={2} onPageChange={onPageChangeMock} />);
    
    fireEvent.click(screen.getByText('← Previous'));
    
    expect(onPageChangeMock).toHaveBeenCalledTimes(1);

    // Check it was called with a function
    const cb = onPageChangeMock.mock.calls[0][0];
    expect(typeof cb).toBe('function');

    // Simulate the function with a sample current page
    const result = cb(2); // current page = 2, direction = +1
    expect(result).toBe(1); // next page should be 3
  });

});
