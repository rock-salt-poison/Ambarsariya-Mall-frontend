import React, { useState } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import Button2 from '../../Components/Home/Button2';
import Board from '../../Components/CouponOffering/Board';
import boardImg from '../../Utils/images/Sell/coupon_offering_page/board.svg';
import Offers from '../../Components/CouponOffering/Offers';
import { useNavigate } from 'react-router-dom';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import RetailerPopupContent from '../../Components/CouponOffering/RetailerPopupContent';
import LoyaltyPopupContent from '../../Components/CouponOffering/LoyaltyPopupContent';
import SubscriptionPopupContent from '../../Components/CouponOffering/SubscriptionPopupContent';
import CustomizablePopupContent from '../../Components/CouponOffering/CustomizablePopupContent';


const OFFER_TYPES = [
  { type: 'retailer', popup: true, popup_body_content:<RetailerPopupContent/> },
  { type: 'subscription', popup: true, popup_body_content:<SubscriptionPopupContent/> },
  { type: 'loyalty', popup: true, popup_body_content:<LoyaltyPopupContent/> },
  { type: 'customizable', popup: true, popup_body_content:<CustomizablePopupContent/> }
];

const MAX_HEIGHT = 135;

function CouponOfferingPage(props) {

  const [graphHeights, setGraphHeights] = useState(
    OFFER_TYPES.reduce((acc, offer) => ({ ...acc, [offer.type]: 0 }), {})
  );
  const navigate = useNavigate();

  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--text-color-light)',
    textColor: 'black', scrollbarThumb: 'var(--brown)'
  };
  
  const theme = createCustomTheme(themeProps);

  const handleClick = (e, type) => {
    let offer_box = e.target.closest('.offer_box');
    let make_a_wish = e.target.closest('.make_a_wish');

    if (offer_box) {
      offer_box.classList.add('reduceSize3');

      setTimeout(() => {
        offer_box.classList.remove('reduceSize3');
        setGraphHeights((prevHeights) => {
          const newHeight = prevHeights[type] + 10;
          return {
            ...prevHeights,
            [type]: newHeight <= MAX_HEIGHT ? newHeight : MAX_HEIGHT,
          };
        });

        if (make_a_wish) {
          setTimeout(() => navigate('../book-eshop'), 600);
        }
      }, 300);
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Box className="coupon_offering_wrapper">
      <Box className="row">
        <Box className="col">
          <Button2 text="Back" redirectTo="/AmbarsariyaMall/sell" />

          <Box className="header_board">
            <Board text="E-shop" imgSrc={boardImg} />
            <Board text="coupons offering" imgSrc={boardImg} />
            <Board text="emboss brand" imgSrc={boardImg} />
          </Box>
        </Box>

        <Box className="col">
          {OFFER_TYPES.map(({ type, popup, popup_body_content }) => (
            <Offers
              key={type}
              text={type}
              popup={popup}
              popup_body_content={popup_body_content}
              onClick={(e) => handleClick(e, type)}
            />
          ))}
          <Offers text="Rs 10/per day" onClick={(e) => handleClick(e)} />
        </Box>

        <Box className="col">
          <Box className="graph_container">
            {OFFER_TYPES.map(({ type }) => (
              <Box
                key={type}
                className={`${type}_graph`}
                style={{ height: `${graphHeights[type]}px` }}
              ></Box>
            ))}
          </Box>
          <Typography className="total">
            Total= X / 300
            <Typography variant="span"> + </Typography>10 per day
          </Typography>
          <Offers
            text="make a wish"
            optionalCname="make_a_wish"
            onClick={(e) => handleClick(e)}
          />
        </Box>
      </Box>
    </Box>
    </ThemeProvider>
  );
}

export default CouponOfferingPage;
