import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { FaUsers, FaUserPlus, FaTrophy, FaHandshake } from 'react-icons/fa';

const FourBox = () => {
  const [stats, setStats] = useState({
    total: 0,
    recent: 0,
  });

useEffect(() => {
  const fetchStats = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('https://bluezattendance.onrender.com/api/accounts/stats/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setStats({
        total: res.data.total_employees,
        recent: res.data.recent_employees,
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  fetchStats();
}, []);


  const boxData = [
    {
      title: 'Total Employees',
      count: stats.total,
      icon: <FaUsers />,
      color: '#007bff',
    },
    {
      title: 'Recent Employees',
      count: stats.recent,
      icon: <FaUserPlus />,
      color: '#28a745',
    },
    {
      title: 'Achievements',
      count: 25, // keep static or add API later
      icon: <FaTrophy />,
      color: '#ffc107',
    },
    {
      title: 'Clients',
      count: 50, // keep static or add API later
      icon: <FaHandshake />,
      color: '#dc3545',
    },
  ];

  return (
    <section className="container my-4">
      <div className="row">
        {boxData.map((box, index) => (
          <div key={index} className="col-md-3 col-sm-6 mb-4">
            <div className="four-box-item" style={{ backgroundColor: box.color }}>
              <div className="icon">{box.icon}</div>
              <h4>{box.count}</h4>
              <p>{box.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FourBox;
