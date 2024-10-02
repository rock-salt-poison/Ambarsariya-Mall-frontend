import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import Button2 from '../../Components/Home/Button2'
import Board from '../../Components/CouponOffering/Board'
import boardImg from '../../Utils/images/Sell/coupon_offering_page/board2.svg'
import BookEshopForm from '../../Components/Form/BookEshopForm'
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';

function BuyEshop(props) {
  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--pink1)',
    textColor: 'black', scrollbarThumb: 'var(--brown)'
  };

  const theme = createCustomTheme(themeProps);
  return (
    <ThemeProvider theme={theme}>
      <Box className="buy_eshop_wrapper">
        <Box className="row">
          <Box className="col">
            <Button2 text="Back" redirectTo="/AmbarsariyaMall/sell" />
            <Box className="header_board">
              <Board text="Book Your E-shop" imgSrc={boardImg} />
            </Box>
            <Box></Box>
          </Box>
          <Box className="col">
            <Box></Box>
            <Box className="container">
              <Box className="child">
                <BookEshopForm />
              </Box>
            </Box>
            <Box></Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default BuyEshop