import React, { useEffect, useState } from 'react';
import API from '../services/api';

const WatchmanDashboard = () => {
  const [passes, setPasses] = useState([]);

  const fetchData = async () => {
    const res = await API.get('/pass/unchecked');
    setPasses(res.data);
  };

  const toggleLeft = async (id, checked) => {
    await API.patch(`/pass/update/${id}`, { left: checked });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Watchman Dashboard</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Branch</th>
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Reason</th>
            <th className="p-2 border">Issued By</th>
            <th className="p-2 border">Left</th>
          </tr>
        </thead>
        <tbody>
          {passes.map(pass => (
            <tr key={pass.id}>
              <td className="p-2 border">{pass.student_name}</td>
              <td className="p-2 border">{pass.branch}</td>
              <td className="p-2 border">{pass.year}</td>
              <td className="p-2 border">{pass.date}</td>
              <td className="p-2 border">{pass.time}</td>
              <td className="p-2 border">{pass.reason}</td>
              <td className="p-2 border">{pass.issued_by}</td>
              <td className="p-2 border text-center">
                <input
                  type="checkbox"
                  checked={pass.left}
                  onChange={(e) => toggleLeft(pass.id, e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchmanDashboard;
