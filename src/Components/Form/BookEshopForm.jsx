import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import FormField from '../Form/FormField'; 
import { useNavigate } from 'react-router-dom';
import {postEshop, fetchDomains, fetchDomainSectors, fetchSectors, getShopUserData} from '../../API/fetchExpressAPI'
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setTokenValid } from '../../store/authSlice';


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
    domain:0,
    domain_create: '',
    sector:0,
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
  const [user_type, set_user_type] = useState('shop');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.shopAccessToken);

  const navigate = useNavigate();

  // Simulated OTP for demonstration purposes
  const validUsernameOtp = '123456';
  const validPhoneOtp = '123456';
  const validMemberOtp = '123456';

  const fetchUserAndShopData = async (shop_access_token) => {
    const response = await getShopUserData(shop_access_token);
    if(response){
      const data = response[0];
      
      setFormData({
        ...formData,
        username: data.username || '',
        password: data.password || '',
        confirm_password: data.password || '',
        title: data.title || '',
        fullName: data.full_name || '',
        phone1: data.phone_no_1 || '',
        phone2: data.phone_no_2 || '',
        address: data.address || '',
        domain: data.domain_name || 0,
        sector: data.sector_name || 0,
        onTime: data.ontime || 0,
        offTime: data.offtime || 0,
        pickup: data.type_of_service.includes("Pickup") || false,
        delivery: data.type_of_service.includes("Delivery") || false,
        homeVisit: data.type_of_service.includes("Home Visit") || false,
        gst: data.gst || '',
        msme: data.msme || '',
        pan_no: data.pan_no || '',
        cin_no: data.cin_no || '',
        paidVersion: data.paid_version || false,
        premiumVersion: data.premium_service || false,
        merchant: data.is_merchant || false,
        member_detail: data.member_username_or_phone_no || ''
      });
    }
  }

  useEffect(()=>{
    const getDomains = async () => {
      try {
        const resp = await fetchDomains();
        const domains = resp.map((data)=>data.domain_name);
        setDomains(['Create', ...domains]);
      } catch (error) {
        console.error('Error fetching domains:', error);
      }
    }
    getDomains()
    if(token){
      fetchUserAndShopData(token);
    }
  },[token]);

  const handleChange = async (e) => {
    if (!e.target) return;
    const { name, value, type, checked } = e.target;
  
    if (name === 'domain') {
      try {
        // Fetch domains and find the selected domain
        const domains = await fetchDomains();
        const selectedDomain = domains.find((val) => val.domain_name === value);
  
        // Prepare the sectors list based on the selected domain
        let sectors = [];
        if (selectedDomain) {
          sectors = (await fetchDomainSectors(selectedDomain.domain_id)).map((data) => data.sector_name);
          setFormData((prevData) => ({
            ...prevData,
            domain: selectedDomain.domain_id, // Set domain_id
            sector: 0, // Reset sector field to default value
          }));
        }
  
        // Add 'Create' to the list of sectors and update the formData state
        setSectors(['Create', ...sectors]);
  
      } catch (error) {
        console.error('Error fetching sectors:', error);
      }
    }
  
    // Handle sector change
    if (name === 'sector') {
      try {
        const selectedSector = (await fetchSectors()).find((val) => val.sector_name === value);
  
        if (selectedSector) {
          setFormData((prevData) => ({
            ...prevData,
            sector: selectedSector.sector_id, // Update sector_id in form data
          }));
        }
      } catch (error) {
        console.error('Error fetching sectors:', error);
      }
    }
  
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
  
  
  // console.log((formData.phone2).length)

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

    const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password = true;
      newErrorMessages.password = 'Password must be at least 8 characters long and include a special character';
      valid = false;
    }


    const phonePattern = /^\+91\s\d{5}-\d{5}$/;
    if (!phonePattern.test(formData.phone1)) {
      newErrors.phone1 = true;
      newErrorMessages.phone1 = 'Phone No. 1 must be +91 followed by 10 digits';
      valid = false;
    }

    // Only validate phone2 if it's filled out
    if (formData.phone2 && !phonePattern.test(formData.phone2)) {
      newErrors.phone2 = true;
      newErrorMessages.phone2 = 'Phone No. 2 must be +91 followed by 10 digits';
      valid = false;
    }

    if((formData.phone2).length>3){
      if (formData.phone1 === formData.phone2) {
        newErrors.phone2 = true;
        newErrorMessages.phone2 = 'Phone No. 2 must be unique';
        valid = false;
      }
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

    if(formData.phone2){
      if (formData.phone2_otp !== validPhoneOtp) {
        newErrors.phone2_otp = true;
        newErrorMessages.phone2_otp = 'Invalid OTP for Phone No. 2';
        valid = false;
      }
    }


    if(formData.merchant){
      if (formData.member_otp !== validMemberOtp) {
        newErrors.member_otp = true;
        newErrorMessages.member_otp = 'Invalid OTP';
        valid = false;
      }
      if(formData.member_otp == validMemberOtp){
        set_user_type('shop');
      }
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const handleSubmit = async (e) => {
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
        if (validateInitialForm()) {
          try {
            const selectedDomain = (await fetchDomains()).find(domain => domain.domain_name === formData.domain);
            const selectedSector = (await fetchSectors()).find(sector => sector.sector_name === formData.sector);
  
            const postData = {
              title: formData.title,
              fullName: formData.fullName,
              username: formData.username,
              password: formData.password,
              address: formData.address,
              phone1: formData.phone1,
              domain: selectedDomain?.domain_id,
              sector: selectedSector?.sector_id,
              created_domain: formData.domain_create,
              created_sector: formData.sector_create,
              onTime: formData.onTime,
              offTime: formData.offTime,
              paidVersion: formData.paidVersion,
              merchant: formData.merchant,
              pickup: formData.pickup,
              homeVisit: formData.homeVisit,
              delivery: formData.delivery,
              user_type: user_type,
              premiumVersion: formData.premiumVersion,
  
              // Add phone2 if present
              ...(formData.phone2 && { phone2: formData.phone2 }),
  
              // Add paid version details if applicable
              ...(formData.paidVersion && {
                gst: formData.gst,
                pan_no: formData.pan_no,
                cin_no: formData.cin_no,
                ...(formData.msme && { msme: formData.msme }),
              }),
  
              // Add member detail if paid version and merchant are true
              ...(formData.paidVersion && formData.merchant && {
                member_detail: formData.member_detail,
              }),
            };
  
            const response = await postEshop(postData);
  
            // Store the shopAccessToken in localStorage
            if (response) {
              const shop_access_token = response.shop_access_token;
              dispatch(setToken(shop_access_token));

              localStorage.setItem('shopAccessToken', shop_access_token);
              

            }
  
            console.log('Form Data:', formData);
            if (formData.premiumVersion) {
              setTimeout(() => {
                loggedIn ? navigate('../eshop') : navigate('../login');
              }, 100);
            } else {
              setTimeout(() => {
                loggedIn ? navigate('../eshop') : navigate('../login');
              }, 100);
            }
          } catch (error) {
            console.error("Error submitting form:", error);
          }
        }
      }
    }
  };
  

  const [domains, setDomains] = useState([]); 
  const [sectors, setSectors] = useState([]);
  const titleOptions = ['Mr.', 'Ms.', 'Mrs.'];

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
            {formData.phone2 && showPhoneOtp && renderFormField('OTP for Phone No. 2:', 'phone2_otp', 'text')}
          </Box>
        </Box>
        <Box className="form-group2">
          <Box className="form-subgroup">
            {renderFormField('Domain :', 'domain', 'select', domains, 'Choose or create')}
            {formData.domain === 'Create' && renderFormField('Custom Domain:', 'domain_create', 'text')}
          </Box>
          <Box className="form-subgroup">
            {renderFormField('Sector :', 'sector', 'select', sectors, 'Choose or create')}
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