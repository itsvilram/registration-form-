import React, { useState, useEffect } from 'react';
import './styles.css';

const UserDetail = ({ user, onClose }) => {
  return (
    <div className="user-details-popup">
      <div className="user-details">
        <h2>User Details</h2>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Contact Number: {user.phone}</p>
        <p>Bio: {user.bio}</p>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const RegisteredUsersList = ({ users, onViewDetails }) => {
  return (
    <div className="registered-users-list">
      <h2>Registered Users for the Event</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - Registered at: {new Date(parseInt(user.id)).toLocaleString()}
            <button onClick={() => onViewDetails(user)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const InputDataPage = () => {
  const [userRegistration, setUserRegistration] = useState({
    username: '',
    email: '',
    phone: '',
    bio: '',
  });
  const [users, setUsers] = useState([]);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const handleCloseUserDetail = () => {
    setShowUserDetail(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userRegistration.username && userRegistration.email && userRegistration.phone && userRegistration.bio) {
      const newRecord = { ...userRegistration, id: new Date().getTime().toString() };
      const updatedUsers = [...users, newRecord];
      setUsers(updatedUsers);
      setUserRegistration({ username: '', email: '', phone: '', bio: '' });

      //Local Storage
      localStorage.setItem('userRecords', JSON.stringify(updatedUsers));
    } else {
      alert('Please fill in all fields.');
    }
  };

  useEffect(() => {
    // Load data from Local Storage when the component mounts
    const storedUsers = JSON.parse(localStorage.getItem('userRecords'));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  return (
    <div className="center-container">
      <h1>Registration</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            autoComplete="off"
            value={userRegistration.username}
            onChange={handleInput}
            name="username"
            id="username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            autoComplete="off"
            value={userRegistration.email}
            onChange={handleInput}
            name="email"
            id="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            autoComplete="off"
            value={userRegistration.phone}
            onChange={handleInput}
            name="phone"
            id="phone"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            autoComplete="off"
            value={userRegistration.bio}
            onChange={handleInput}
            name="bio"
            id="bio"
            required
          />
        </div>
        <button type="submit">Registration</button>
      </form>

      <RegisteredUsersList users={users} onViewDetails={handleViewUser} />

      {showUserDetail && selectedUser && (
        <UserDetail user={selectedUser} onClose={handleCloseUserDetail} />
      )}
    </div>
  );
};

export default InputDataPage;
