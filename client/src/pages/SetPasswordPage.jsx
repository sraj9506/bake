import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { setPassword } from '../services/UserService';

const SetPasswordPage = () => {
  const { userId } = useParams(); // Get userId from the URL
  const navigate = useNavigate(); // For navigation
  const [password, setPasswordValue] = useState('');
  const [confirmPassword, setConfirmPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  // Handlers for input fields
  const handlePasswordChange = (e) => setPasswordValue(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPasswordValue(e.target.value);
  const handleShowPasswordToggle = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      const response = await setPassword(userId, password);

      if (response.alreadySet) {
        // Show alert and redirect to the login page
        alert(response.message);
        navigate('/login'); // Redirect to login page
      } else {
        alert('Password set successfully! You can now log in.');
        navigate('/login'); // Redirect to login page after success
      }
    } catch (error) {
      alert(error.message || 'An error occurred while setting the password.');
    }
  };

  return (
    <div>
      <h1>Set Password</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="showPassword">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={handleShowPasswordToggle}
            />
            Show Passwords
          </label>
        </div>
        <button type="submit">Set Password</button>
      </form>
    </div>
  );
};

export default SetPasswordPage;
