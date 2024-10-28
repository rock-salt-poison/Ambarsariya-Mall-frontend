import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import FormField from '../Form/FormField'; 
import { useNavigate } from 'react-router-dom';

const BookEshopForm = () => {
  const initialFormData = {
    title: 'Mr.',
    fullName: '',
    username: '',
    password: '',
    confirm_password: '',
    address: '',
    phone1: '',
    phone1_otp: '',
    phone2: '',
    phone2_otp: '',
    domain: '',
    domain_create: '',
    sector: '',
    sector_create: '',
    onTime: '',
    offTime: '',
    gst: '',
    msme: '',
    pan_no: '',
    cin_no: '',
    pickup: false,
    delivery: false,
    homeVisit: false,
    paidVersion: false,
    premiumVersion: false,
    username_otp: '',
    merchant:false,
    member_detail:'',
    member_otp: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [showUsernameOtp, setShowUsernameOtp] = useState(false);
  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [showMemberOtp, setShowMemberOtp] = useState(false);

  const navigate = useNavigate();

  // Simulated OTP for demonstration purposes
  const validUsernameOtp = '123456';
  const validPhoneOtp = '123456';
  const validMemberOtp = '123456';

  const handleChange = (e) => {
    if (!e.target) return;
    const { name, value, type, checked } = e.target;

    // if (name === 'phone1' || name === 'phone2') {
    //   // Remove all non-numeric characters except '+'
    //   const cleanValue = value.replace(/[^0-9]/g, '');
    //   // Format as +91 followed by 10 digits
    //   let formattedValue = '+91';
    //   if (cleanValue.length > 0) {
    //     formattedValue += cleanValue.substring(0, 10); // Only show first 10 digits
    //   }
    //   setFormData({
    //     ...formData,
    //     [name]: formattedValue,
    //   });
    //   return;
    // }
  
    // Validate OTP fields
    if ((name === 'phone1_otp' || name === 'phone2_otp' || name === 'username_otp' || name === 'member_otp') && !/^\d{0,6}$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? !!checked : value,
    });

    // Reset errors and error messages
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [name]: '' }));

  };

  const validateInitialForm = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    const requiredFields = [
      'username',
      'password',
      'confirm_password',
      'fullName',
      'address',
      'phone1',
      'phone2',
      'domain',
      'sector',
      'onTime',
      'offTime',
    ];

    if (formData.paidVersion) {
      requiredFields.push('gst', 'pan_no', 'cin_no');
      if (formData.merchant) {
        requiredFields.push('member_detail');
      }
    }

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        newErrorMessages[field] = `${field.replace(/_/g, ' ')} is required`;
        valid = false;
      }
    });

    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailPattern.test(formData.username)) {
      newErrors.username = true;
      newErrorMessages.username = 'Please enter a valid Gmail address';
      valid = false;
    }

    // const phonePattern = /^\+91 \d{10}$/;
    // if (!phonePattern.test(formData.phone1)) {
    //   newErrors.phone1 = true;
    //   newErrorMessages.phone1 = 'Phone No. 1 must be +91 followed by 10 digits';
    //   valid = false;
    // }
  
    if (formData.phone1 === formData.phone2) {
      newErrors.phone2 = true;
      newErrorMessages.phone2 = 'Phone No. 2 must be unique';
      valid = false;
    }
  
    // if (!phonePattern.test(formData.phone2)) {
    //   newErrors.phone2 = true;
    //   newErrorMessages.phone2 = 'Phone No. 2 must be +91 followed by 10 digits';
    //   valid = false;
    // }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = true;
      newErrorMessages.confirm_password = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const validateOtp = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    // Validate OTP for username
    if (formData.username_otp !== validUsernameOtp) {
      newErrors.username_otp = true;
      newErrorMessages.username_otp = 'Invalid OTP for username';
      valid = false;
    }

    // Validate OTP for phone numbers
    if (formData.phone1_otp !== validPhoneOtp) {
      newErrors.phone1_otp = true;
      newErrorMessages.phone1_otp = 'Invalid OTP for Phone No. 1';
      valid = false;
    }

    if (formData.phone2_otp !== validPhoneOtp) {
      newErrors.phone2_otp = true;
      newErrorMessages.phone2_otp = 'Invalid OTP for Phone No. 2';
      valid = false;
    }


    if(formData.merchant){
      if (formData.member_otp !== validMemberOtp) {
        newErrors.member_otp = true;
        newErrorMessages.member_otp = 'Invalid OTP';
        valid = false;
      }
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedIn = !!localStorage.getItem('access_token');

    if (!showUsernameOtp) {
      // Validate initial form fields
      if (validateInitialForm()) {
        // Show OTP fields if initial validation is successful
        setShowUsernameOtp(true);
        setShowPhoneOtp(true);
        setShowMemberOtp(true);
      }
    } else {
      // Validate OTP fields
      if (validateOtp()) {
        if(validateInitialForm()){
          // Submit form data if OTP is correct
          console.log('Form Data:', formData);
          if (formData.premiumVersion) {
            setTimeout(()=>{loggedIn? navigate('../eshop') : navigate('../login')},100); 
          } else {
            setTimeout(()=>{loggedIn? navigate('../eshop') : navigate('../login')},100); 
          }
        }
      }
    }
  };

  const domainOptions = ['Create', 'Education', 'Healthcare', 'Finance'];
  const sectorOptions = ['Create', 'Education', 'Healthcare', 'Finance'];
  const titleOptions = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'];

  const renderFormField = (label, name, type, options = [], placeholder = '', additionalProps = {}) => (
    <FormField
      label={label}
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
        {renderFormField('Username / email id :', 'username', 'email')}
        {showUsernameOtp && (
          <Box className="form-group2">
            {renderFormField('Username OTP:', 'username_otp', 'text')}
          </Box>
        )}
        <Box className="form-group2">
          {renderFormField('Password :', 'password', 'password')}
          {renderFormField('Confirm Password :', 'confirm_password', 'password')}
        </Box>
        <Box className="form-group3">
          {renderFormField('Full Name :', 'title', 'select', titleOptions)}
          {renderFormField('Full Name :', 'fullName', 'text')}
        </Box>
        {renderFormField('Address :', 'address', 'text')} 
        <Box className="form-group2">
          <Box className="form-subgroup">
            {renderFormField('Phone No. 1:', 'phone1', 'phone_number', [], '', { maxLength: 10 })}
            {showPhoneOtp && renderFormField('OTP for Phone No. 1:', 'phone1_otp', 'text')}
          </Box>
          <Box className="form-subgroup">
            {renderFormField('Phone No. 2:', 'phone2', 'phone_number', [], '', { maxLength: 10 })}
            {showPhoneOtp && renderFormField('OTP for Phone No. 2:', 'phone2_otp', 'text')}
          </Box>
        </Box>
        <Box className="form-group2">
          <Box className="form-subgroup">
            {renderFormField('Domain :', 'domain', 'select', domainOptions, 'Choose or create')}
            {formData.domain === 'Create' && renderFormField('Custom Domain:', 'domain_create', 'text')}
          </Box>
          <Box className="form-subgroup">
            {renderFormField('Sector :', 'sector', 'select', sectorOptions, 'Choose or create')}
            {formData.sector === 'Create' && renderFormField('Custom Sector:', 'sector_create', 'text')}
          </Box>
        </Box>
        <Box className="form-group2">
          {renderFormField('On Time :', 'onTime', 'time')}
          {renderFormField('Off Time :', 'offTime', 'time')}
        </Box>
        <Box className="form-group-checkbox">
          <Typography className="label">Type of Service :</Typography>
          <Box className="checkbox-group">
            {renderFormField('Pickup', 'pickup', 'checkbox')}
            {renderFormField('Delivery', 'delivery', 'checkbox')}
            {renderFormField('Home Visit', 'homeVisit', 'checkbox')}
          </Box>
        </Box>
        <Box className="form-group-switch">
        {renderFormField('Do you want paid version', 'paidVersion', 'switch')}
        </Box>
        {formData.paidVersion &&  <><Box className="form-group2">
          {renderFormField('GST :', 'gst', 'text')}
          {renderFormField('MSME :', 'msme', 'text')}
        </Box>
        <Box className="form-group2">
          {renderFormField('Pan No.', 'pan_no', 'text')}
          {renderFormField('CIN No.', 'cin_no', 'text')}
        </Box>

        <Box className="form-group-switch">
          {renderFormField('Be a merchant', 'merchant', 'switch')}
        </Box>
          {formData.merchant && 
          renderFormField('', 'member_detail', 'text', '', 'Member username or Phone no.')}
          {formData.merchant && showMemberOtp && renderFormField('Member OTP:', 'member_otp', 'text')}
        </>
        }
        
       
        
       
        <Box className="form-group-switch">
        {renderFormField('Do you want premium version', 'premiumVersion', 'switch')}
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

export default BookEshopForm;