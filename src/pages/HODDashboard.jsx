import React, { useEffect, useState } from 'react';
import API from '../services/api';

const HODDashboard = () => {
  const [formData, setFormData] = useState({
    student_name: '',
    branch: '',
    year: '',
    date: '',
    time: '',
    reason: '',
  });

  const [view, setView] = useState('create'); // create | unchecked | history
  const [passes, setPasses] = useState([]);

  const fetchPasses = async () => {
    try {
      const endpoint = view === 'unchecked' ? '/pass/unchecked' : '/pass/issued';
      const res = await API.get(endpoint);
      setPasses(res.data);
    } catch (err) {
      console.error('Error fetching passes:', err);
    }
  };

  useEffect(() => {
    if (view !== 'create') fetchPasses();
  }, [view]);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/pass/create', formData);
      alert('Pass Created');
      setFormData({
        student_name: '',
        branch: '',
        year: '',
        date: '',
        time: '',
        reason: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to create pass');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="flex justify-center mb-6 space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setView('create')}>
          Create Pass
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setView('unchecked')}>
          Unchecked Passes
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded" onClick={() => setView('history')}>
          Pass History
        </button>
      </div>

      {view === 'create' && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mb-8">
          <h2 className="text-xl font-bold mb-4">Issue New Pass</h2>
          {['student_name', 'branch', 'year', 'date', 'time', 'reason'].map(field => (
            <input
              key={field}
              name={field}
              type={field === 'date' ? 'date' : field === 'time' ? 'time' : 'text'}
              placeholder={field.replace('_', ' ').toUpperCase()}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
          ))}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Create Pass</button>
        </form>
      )}

      {view !== 'create' && (
        <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">{view === 'unchecked' ? 'Unchecked Passes' : 'Pass History'}</h3>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th>Name</th>
                <th>Branch</th>
                <th>Year</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {passes.map((pass) => (
                <tr key={pass.id} className="text-center">
                  <td>{pass.student_name}</td>
                  <td>{pass.branch}</td>
                  <td>{pass.year}</td>
                  <td>{pass.date}</td>
                  <td>{pass.time}</td>
                  <td>{pass.reason}</td>
                  <td>{pass.left ? 'Left' : 'Pending'}</td>
                </tr>
              ))}
              {passes.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">No passes to show</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HODDashboard;
