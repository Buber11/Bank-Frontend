import React, { useEffect, useState } from 'react';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  // Definicja funkcji `fetchEmployees`
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users`, {
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

  // Wywołanie `fetchEmployees` przy pierwszym renderowaniu komponentu
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDeleteUser = async (userId) => {
    console.log("Attempting to delete user with ID:", userId);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}`;
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
        fetchEmployees(); // Ponownie pobierz pracowników po usunięciu
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to delete user: ${errorText}`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'LOCKED' : 'ACTIVE'; 
    const url = `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/${newStatus}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'LOCKED' }),
        credentials: 'include'
      });

      if (response.ok) {
        fetchEmployees(); // Ponownie pobierz pracowników po zmianie statusu
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to change user status: ${errorText}`);
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
            <th>Remove</th>
            <th>Change status</th>
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
                <button onClick={() => handleDeleteUser(employee.userId)}>REMOVE</button>
              </td>
              <td>
                <button onClick={() => handleStatusChange(employee.userId, employee.status)}
                  className={employee.status === 'ACTIVE' ? 'status-button locked' : 'status-button active'}>
                  {employee.status === 'ACTIVE' ? 'Lock' : 'Activate'}
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
