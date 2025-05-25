import React, { useEffect, useState } from 'react';
import API from '../services/api';

const UncheckedPasses = () => {
  const [passes, setPasses] = useState([]);

  useEffect(() => {
    const fetchPasses = async () => {
      const res = await API.get('/pass/issued');
      setPasses(res.data.filter(pass => !pass.left));
    };
    fetchPasses();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Unchecked Students</h2>
      <ul>
        {passes.map(pass => (
          <li key={pass.id} className="border p-2 mb-2">
            {pass.student_name} | {pass.date} | {pass.time} | {pass.reason}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UncheckedPasses;
