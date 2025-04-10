import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const changePage = (direction) => {
    onPageChange((prev) =>
      Math.min(Math.max(1, prev + direction), totalPages)
    );
  };

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={() => changePage(-1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        ← Previous
      </button>
      <span className="text-sm text-gray-600">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>
      <button
        onClick={() => changePage(1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
