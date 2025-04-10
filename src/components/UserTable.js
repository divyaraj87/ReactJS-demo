import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

const UserTable = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    let updated = [...data];
    console.log("API response", updated);
    if (search) {
      updated = updated.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    updated.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (sortOrder === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });

    setFilteredData(updated);
    setCurrentPage(1);
    console.log("Filtered API response", displayedData);

  }, [search, sortField, sortOrder, data]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2 items-center">
          <label htmlFor="sortField" className="text-sm font-medium text-gray-600">
            Sort by:
          </label>
          <select
            id="sortField"
            className="sort-select"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="username">Username</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="sort-button"
          >
            {sortOrder === 'asc' ? '⬆' : '⬇'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="table-header">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Username</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">City</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedData.map((user) => (
              <tr key={user.id} className="table-row">
                <td className="px-5 py-3">{user.name}</td>
                <td className="px-5 py-3">{user.username}</td>
                <td className="px-5 py-3">{user.email}</td>
                <td className="px-5 py-3">{user.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UserTable;
