import React, { useEffect, useState } from 'react';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://localhost:8443/api/v1/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }

        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDeleteUser = async (userId) => {
    console.log("Attempting to delete user with ID:", userId);
    const url = `https://localhost:8443/api/v1/users/${userId}`;
    console.log(url);
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.status === 204) {
        setEmployees(employees.filter(employee => employee.userId !== userId));
      } else if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete user: ${errorText}`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredEmployees = employees.filter(employee =>
    statusFilter === '' || employee.status === statusFilter
  );

  return (
    <div className="employee-list">
      <h2>Client List</h2>
      
      <div>
        <label htmlFor="statusFilter">Filter by Status: </label>
        <select id="statusFilter" value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="">All</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="LOCKED">Locked</option>
          <option value="CLOSED">Closed</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.userId}>
              <td>{employee.userId}</td>
              <td>{employee.username}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.status}</td>
              <td>
              
                <button
                  onClick={() => {
                    handleDeleteUser(employee.userId);
                  }}
                >
                  REMOVE
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
