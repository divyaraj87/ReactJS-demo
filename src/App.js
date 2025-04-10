import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from './components/UserTable';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">User Table</h1>
        <UserTable data={data} />
      </div>
    </div>
  );
};

export default App;
