import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserTable from './UserTable';

// Mock Pagination component
jest.mock('./Pagination', () => ({ currentPage, totalPages, onPageChange }) => (
  <div>
    <span>{`Page ${currentPage} of ${totalPages}`}</span>
    <button onClick={() => onPageChange(currentPage - 1)}>← Previous</button>
    <button onClick={() => onPageChange(currentPage + 1)}>Next →</button>
  </div>
));

const mockUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    username: 'alicej',
    email: 'alice@example.com',
    address: { city: 'New York' },
  },
  {
    id: 2,
    name: 'Bob Smith',
    username: 'bobsmith',
    email: 'bob@example.com',
    address: { city: 'Los Angeles' },
  },
  {
    id: 3,
    name: 'Charlie Brown',
    username: 'charlieb',
    email: 'charlie@example.com',
    address: { city: 'Chicago' },
  },
];

describe('UserTable', () => {
  test('renders all table data', () => {
    render(<UserTable data={mockUsers} />);

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('bobsmith')).toBeInTheDocument();
    expect(screen.getByText('charlie@example.com')).toBeInTheDocument();
  });

  test('filters results based on search input', () => {
    render(<UserTable data={mockUsers} />);

    const searchInput = screen.getByPlaceholderText(/search by name or email/i);
    fireEvent.change(searchInput, { target: { value: 'bob' } });

    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
  });

  test('sorts by selected field', () => {
    render(<UserTable data={mockUsers} />);

    const sortSelect = screen.getByLabelText(/sort by:/i);
    fireEvent.change(sortSelect, { target: { value: 'email' } });

    expect(sortSelect.value).toBe('email');
  });

  test('toggles sort order', () => {
    render(<UserTable data={mockUsers} />);
    const sortBtn = screen.getByRole('button', { name: '⬆' });

    fireEvent.click(sortBtn);
    expect(sortBtn.textContent).toBe('⬇');

    fireEvent.click(sortBtn);
    expect(sortBtn.textContent).toBe('⬆');
  });

  test('displays pagination and navigates pages', () => {
    render(<UserTable data={mockUsers} />);

    expect(screen.getByText(/page 1 of/i)).toBeInTheDocument();

    const nextBtn = screen.getByText(/next/i);
    fireEvent.click(nextBtn);

    expect(screen.getByText(/page 2 of/i)).toBeInTheDocument();
  });

});
