import React, { useState } from 'react';
import { TextField, Button, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import lock_icon from '../../Utils/images/Sell/login/lock_icon.svg';
import tag_chain_icon from '../../Utils/images/Sell/login/tag_chain_icon.svg';
import input_img from '../../Utils/images/Sell/login/input_bg.svg';

const LoginForm = ({redirectTo}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    username: '',
    password: '',
  });

  const [step, setStep] = useState(0); // Step 0: username, Step 1: password

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));

    setErrorMessages((prevMessages) => ({
      ...prevMessages,
      [name]: '',
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};
    const newErrorMessages = {};

    if (!formData.username && step === 0) {
      newErrors.username = true;
      newErrorMessages.username = 'Username is required';
      valid = false;
    }

    if (!formData.password && step === 1) {
      newErrors.password = true;
      newErrorMessages.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return valid;
  };

  const handleNextStep = (e) => {
    if (e) e.preventDefault();
    if (validate()) {
      if (step === 0) {
        setStep(1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (e) e.preventDefault();
      handleNextStep();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
      navigate(`../${redirectTo}`);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      {step === 0 && (
        <Box className="form-control">
          <Box className="form-row">
            <Box component="img" src={input_img} className="input_bg" alt="background" />
            <Box className="field_container">
              <TextField
                hiddenLabel
                variant="outlined"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
                error={errors.username}
                className="input_field"
                placeholder="Enter Username"
              />
              <IconButton onClick={handleNextStep} className="arrow_icon">
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
          {errors.username && <span className="error_message">{errorMessages.username}</span>}
        </Box>
      )}
      {step === 1 && (
        <Box className="form-control">
          <Box className="form-row">
            <Box component="img" src={input_img} className="input_bg" alt="background" />
            <Box className="field_container">
              <TextField
                hiddenLabel
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
                error={errors.password}
                className="input_field"
                placeholder="Enter Password"
              />
              <IconButton onClick={handleNextStep} className="arrow_icon">
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
          {errors.password && <span className="error_message">{errorMessages.password}</span>}
        </Box>
      )}

      <Box className="submit_button_container">
        <Box component="img" src={lock_icon} className="lock_icon" alt="forgot_password" />
        <Box component="img" src={tag_chain_icon} className="tag_chain_icon" alt="tag_chain_icon" />
      </Box>
    </Box>
  );
};

export default LoginForm;
