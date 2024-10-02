import { Box, Typography, Slider } from '@mui/material';
import React from 'react';
import cost_sensitivity_icon from '../../Utils/images/Sell/shop_details/cost_sensitivity_icon.svg'

function ShopDetails2() {
  // Define the slider marks
  const marks = [
    { value: 0, label: 'A' },
    { value: 1, label: 'B' },
    { value: 2, label: 'C' },
    { value: 3, label: 'D' }
  ];

  const costSensitivity = [
    { value: 0, label: 'Easy' },
    { value: 1, label: 'Moderate' },
    { value: 2, label: 'Effective' },
    { value: 3, label: 'Luxury' }
  ];

  return (
    <Box className="shop_details_col2">
      <Box className="shop_details">
        <Typography className="title">Class</Typography>
        <Slider
          value={1} // Default value (optional)
          step={1} // Step between marks
          min={0} // Minimum value
          max={3} // Maximum value
          marks={marks} // Marks array
          className="slider"
        />
      </Box>

      <Box className="shop_details">
        <Box component="img" src={cost_sensitivity_icon} alt="cost_sensitivity" className='cost_sensitivity_icon'/>
        <Slider
          value={0} // Default value (optional)
          step={1} // Step between marks
          min={0} // Minimum value
          max={3} // Maximum value
          marks={costSensitivity} // Marks array
          className="slider"
        />
      </Box>
    </Box>
  );
}

export default ShopDetails2;
