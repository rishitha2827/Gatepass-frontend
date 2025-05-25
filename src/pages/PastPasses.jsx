import React, { useEffect, useState } from 'react';
import API from '../services/api';

const PastPasses = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await API.get('/pass/issued');
      setHistory(res.data.filter(pass => pass.left));
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Past Student History</h2>
      <ul>
        {history.map(pass => (
          <li key={pass.id} className="border p-2 mb-2">
            {pass.student_name} | {pass.date} | {pass.time} | {pass.reason}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastPasses;
