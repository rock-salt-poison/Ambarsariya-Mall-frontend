import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import FormField from '../Form/FormField';

const VisitorShopForm = ({ userName, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: userName || '',
    domain: '',
    sector: '',
    purpose: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    domain: false,
    sector: false,
    purpose: false,
    message: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    domain: '',
    sector: '',
    purpose: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: false,
    });

    setErrorMessages({
      ...errorMessages,
      [name]: '',
    });
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    if (!formData.name) {
      newErrors.name = true;
      newErrorMessages.name = 'Name is required';
      valid = false;
    }

    if (!formData.domain) {
      newErrors.domain = true;
      newErrorMessages.domain = 'Domain is required';
      valid = false;
    }

    if (!formData.sector) {
      newErrors.sector = true;
      newErrorMessages.sector = 'Sector is required';
      valid = false;
    }

    if (!formData.purpose) {
      newErrors.purpose = true;
      newErrorMessages.purpose = 'Purpose is required';
      valid = false;
    }

    if (!formData.message) {
      newErrors.message = true;
      newErrorMessages.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
      onSubmitSuccess(formData.domain, formData.sector);
      const updatedFields = formFieldData.filter((field)=>(field.name!=='domain' && field.name!=='sector' && field.name !== 'purpose'));
      setFormFieldData(updatedFields)
    }
  };

  const formFields = [
    {
      label: 'Visitor Mall001:',
      name: 'name',
      value:userName,
      type: 'text',
      readOnly:true
    },
    {
      label: 'Domain:',
      name: 'domain',
      type: 'select',
      placeholder: 'Select your domain',
      options: ['Sell', 'Wholesale', 'Service', 'Manufacturing', 'Maintenance', 'Daily Needs', 'Co-helper'] // Replace with actual options
    },
    {
      label: 'Sector:',
      name: 'sector',
      type: 'select',
      placeholder: 'Select your sector',
      options: ['Healthcare Services', 'Financial Services', 'Education Services', 'Information and Technology Services', 'Utility Services'] // Replace with actual options
    },
    {
      label: 'Purpose for:',
      name: 'purpose',
      type: 'text',
    },
    {
      label: 'Message:',
      name: 'message',
      type: 'textarea',
    },
  ];

  const [formFieldData, setFormFieldData] = useState(formFields);

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Box className="form-group">
        {formFieldData.map(({ label, name, type, readOnly, value, placeholder, options }) => (
          <FormField
            key={name}
            label={label}
            name={name}
            type={type}
            // value={formData[name].includes("@") ? formData[name].find("@").replace("&#64;")}
            value={value? value : formData[name]}
            onChange={handleChange}
            error={errors[name]}
            errorMessage={errorMessages[name]}
            placeholder={placeholder}
            options={options}
            className='input_field'
            readOnly={readOnly}
          />
        ))}
      </Box>
      <Box className="submit_button_container">
        <Button type="submit" variant="contained" className="submit_button">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default VisitorShopForm;
