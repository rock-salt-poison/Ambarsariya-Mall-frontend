import React from 'react'
import { Box, ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../styles/CustomSelectDropdownTheme';
import board from '../../../Utils/images/Sell/cart/prepaid_postpaid/board.webp';
import credit from '../../../Utils/images/Sell/cart/prepaid_postpaid/credit_img.webp';
import paid from '../../../Utils/images/Sell/cart/prepaid_postpaid/paid_img.webp';

function PrepaidPostpaid() {

    const themeProps = {
      scrollbarThumb: 'var(--brown)',
      popoverBackgroundColor: '#f8e3cc',
    };
  
    const theme = createCustomTheme(themeProps);

  return (
    <ThemeProvider theme={theme}>
        <Box className="body_container">
            <Box className="row">
              <Box className="col">
                <Box component="img" src={board} alt="prepaid_postpaid" className="board_img"/>
              </Box>
              <Box className="col">
                <Box component="img" src={credit} alt="prepaid_postpaid" className="img"/>
              </Box>
            </Box>
            <Box className="row">
              <Box className="col">
                <Box component="img" src={paid} alt="prepaid_postpaid" className="img"/>
              </Box>
              <Box className="col">
              </Box>
            </Box>
        </Box>
    </ThemeProvider>
  )
}

export default PrepaidPostpaid