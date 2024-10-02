import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import FormField from './FormField'; 
import { useNavigate } from 'react-router-dom';

const UserPortfolioForm = () => {
  const initialFormData = {
    name: '',
    phoneNumber: '',
    gender: '',
    age: '',
    address: '',
    username: '',
    password: '',
    confirm_password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'phoneNumber') && !/^\d{0,10}$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
    // Reset errors and error messages
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: '' }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    // Validate required fields
    const requiredFields = ['name', 'phoneNumber', 'gender', 'age', 'address', 'username', 'password','confirm_password'];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        newErrorMessages[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        valid = false;
      }
    });

    // Validate phone number format
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber = true;
      newErrorMessages.phoneNumber = 'Phone number must be 10 digits';
      valid = false;
    }

    // Validate age as a number
    const agePattern = /^\d+$/;
    if (!agePattern.test(formData.age)) {
      newErrors.age = true;
      newErrorMessages.age = 'Age must be a number';
      valid = false;
    }

    if(formData.confirm_password !== formData.password){
      newErrors.confirm_password = true;
      newErrorMessages.confirm_password = 'Passwords do not match.'
      valid= false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
      // Navigate to the appropriate page after form submission
      navigate('../esale')
    }
  };

  const genderOptions = ['Male', 'Female', 'Other'];

  const renderFormField = (name, type, options = [], placeholder = '', additionalProps = {}) => (
    <FormField
      name={name}
      type={type}
      value={formData[name]}
      onChange={handleChange}
      error={!!errors[name]}
      errorMessage={errorMessages[name]}
      options={options}
      placeholder={placeholder}
      {...additionalProps}
    />
  );

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Box className="form-group">
        <Box className="form-group-2">
            {renderFormField('name', 'text', [], 'Enter your name')}
            {renderFormField('phoneNumber', 'tel', [], 'Enter your phone number', { maxLength: 10 })}
        </Box>
        
        <Box className="form-group-2">
            {renderFormField('gender', 'select', genderOptions, 'Select gender')}
            {renderFormField('age', 'number', [], 'Enter your age')}
        </Box>
        {renderFormField('address', 'text', [], 'Enter your address')}
        {renderFormField('username', 'text', [], 'Enter your username')}
        <Box className="form-group-2">
            {renderFormField('password', 'password', [], 'Enter your password')}
            {renderFormField('confirm_password', 'password', [], 'Confirm password')}
        </Box>
      </Box>
      <Box className="submit_button_container">
        <Button type="submit" variant="contained" className="submit_button">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default UserPortfolioForm;
