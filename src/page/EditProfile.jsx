import React, { useState } from 'react';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './EditProfile.css'; // Import the CSS file

const EditProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ')[1] || '',
    email: user?.email || '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setError('');
    setSuccess('');
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (formData.email && formData.email !== user.email) {
        await updateEmail(user, formData.email);
      }

      if (formData.password) {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match.');
          return;
        }
        await updatePassword(user, formData.password);
      }

      const displayName = `${formData.firstName} ${formData.lastName}`;
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
      }

      setSuccess('Profile updated successfully!');
      navigate('/home'); 
      // Optionally navigate to another page
      // navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="edit-profile-container">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
