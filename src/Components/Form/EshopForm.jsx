import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import FormField from './FormField'; 
import { useNavigate } from 'react-router-dom';

const EshopForm = () => {
  const initialFormData = {
    title: 'Mr.',
    business_name: '',
    date_of_establishment: '',
    usp_values: '',
    product_samples: '',
    similar_options: '',
    cost_sensitivity: 0,
    daily_walkin: '',
    parking_availability: '',
    category: '',
    products: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const fieldValue = type === 'file' ? files[0] : value;

    setFormData({
      ...formData,
      [name]: fieldValue,
    });

    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: '' }));
  };

  const handleSliderChange = (event, newValue, name) => {
    setFormData({
      ...formData,
      [name]: newValue,
    });

    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: '' }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    const requiredFields = [
      'business_name',
      'date_of_establishment',
      'usp_values',
      'product_samples',
      'similar_options',
      'cost_sensitivity',
      'daily_walkin',
      'parking_availability',
      'category',
      'products',
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        newErrorMessages[field] = `${field.replace(/_/g, ' ')} is required`;
        valid = false;
      }
    });

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
      navigate('../AmbarsariyaMall/login')
    }
  };

  const categoryOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  const daily_walkin_options = ['Low', 'Medium', 'High', 'Dense'];
  const parking_availability_options = ['Morning', 'Afternoon', 'Evening'];

  const getSliderMarks = (name) => {
    switch (name) {
      case 'cost_sensitivity':
        return [
          { value: 0, label: 'Easy' },
          { value: 1, label: 'Moderate' },
          { value: 2, label: 'Effective' },
          { value: 3, label: 'Luxury' },
        ];
      case 'daily_walkin':
        return [
          { value: 0, label: 'Low' },
          { value: 1, label: 'Medium' },
          { value: 2, label: 'High' },
          { value: 3, label: 'Dense' },
        ];
      case 'parking_availability':
        return [
          { value: 0, label: 'Morning' },
          { value: 1, label: 'Afternoon' },
          { value: 2, label: 'Evening' },
        ];
      default:
        return [];
    }
  };

  const renderFormField = (label, name, type, options = [], placeholder = '', additionalProps = {}) => {
    let additionalClass = '';
    if (name === 'parking_availability') {
      additionalClass = 'parking-availability-slider';
    } else if (name === 'cost_sensitivity') {
      additionalClass = 'cost-sensitivity-slider';
    } else if (name === 'daily_walkin') {
      additionalClass = 'daily-walkin-slider';
    }

    return (
    <FormField
      label={label}
      name={name}
      type={type}
      value={formData[name]}
      onChange={handleChange}
      onSliderChange={handleSliderChange}
      error={!!errors[name]}
      errorMessage={errorMessages[name]}
      options={options}
      placeholder={placeholder}
      getSliderMarks={getSliderMarks}
      className={additionalClass}
      {...additionalProps}
    />
  )};

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Box className="form-group">
        {renderFormField('Name of the business :', 'business_name', 'text')}
        {renderFormField('Date of establishment :', 'date_of_establishment', 'date')}
        {renderFormField('USP Values :', 'usp_values', 'file')}
        {renderFormField('Product Sample :', 'product_samples', 'url')}
        {renderFormField('Similar Options :', 'similar_options', 'select', categoryOptions, 'Select')}
        {renderFormField('Cost sensitivity :', 'cost_sensitivity', 'range')}
        
        <Box className="form-group2">
          <Box className="form-subgroup">
            {renderFormField('Daily Walkin :', 'daily_walkin', 'range')}
          </Box>

          <Box className="form-subgroup">
            {renderFormField('Parking Availability :', 'parking_availability', 'range')}
          </Box>
        </Box>

        {renderFormField('Category :', 'category', 'select', categoryOptions, 'Select')}
        {renderFormField('Products :', 'products', 'file')}
      </Box>
      <Box className="submit_button_container">
        <Button type="submit" variant="contained" className="submit_button">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default EshopForm;