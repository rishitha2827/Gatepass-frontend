import React, { useState } from 'react';
import API from '../services/api';

const PassCreation = () => {
  const [form, setForm] = useState({
    student_name: '',
    branch: '',
    year: '',
    date: '',
    time: '',
    reason: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/pass/create', form);
      alert('Pass created successfully!');
      setForm({ student_name: '', branch: '', year: '', date: '', time: '', reason: '' });
    } catch (err) {
      alert('Error creating pass.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create New Pass</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 bg-white shadow-md p-4 rounded">
        <input
          name="student_name"
          value={form.student_name}
          onChange={handleChange}
          placeholder="Student Name"
          className="border p-2 rounded"
          required
        />
        <input
          name="branch"
          value={form.branch}
          onChange={handleChange}
          placeholder="Branch"
          className="border p-2 rounded"
          required
        />
        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Year"
          className="border p-2 rounded"
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Reason"
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Submit Pass
        </button>
      </form>
    </div>
  );
};

export default PassCreation;
