import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import stationary_bg_img from '../../Utils/images/Sell/merchant_details/stationary.webp';
import healthcare_bg_img from '../../Utils/images/Sell/merchant_details/healthcare.webp';
// import electronics_bg_img from '../../Utils/images/Sell/merchant_details/electronics.webp'; // Add this line for Electronics sector
import Button2 from '../../Components/Home/Button2';
import ShopDetails from '../../Components/Shop/ShopDetails';
import VideoPlayer from '../../Components/MerchantWrapper/VideoPlayer';
import ServicesTypeCard from '../../Components/MerchantWrapper/ServicesTypeCard';

const SingleShopPage = ({ showBackButton = true, shopData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoUrl = 'https://www.example.com/your-video.mp4';

  const columns = [
    {
      shopName: 'Madhav',
      discount: '10',
      coupon: 'amall10',
      products: 'pens, textbooks, books, pencils, charts, toffees, paint and brush',
      domain: 'Retailer',
      sector: 'Stationary',
      supply: 'School & Office',
      shopType: 'Class C',
      costSensitivity: 'Moderate'
    },
  ];
  
  const data = shopData ? shopData : columns;

  const handleClick = (e) => {
    navigate('../shop')
  }

  const getImageSrc = (sector) => {
    switch (sector) {
      case 'Education & Stationary':
        return stationary_bg_img;
      case 'Healthcare':
        return healthcare_bg_img;
      // case 'Electronics':
      //   return electronics_bg_img; // Use the correct image for Electronics sector
      default:
        return stationary_bg_img; // Default image if sector doesn't match
    }
  }

  return (
    <>
      {data.map((column, index) => (
        <Box key={index} className="single_shop_wrapper">
          <Box component="img" src={getImageSrc(column.sector)} className='sector_bg_img' />
          <Box className="row">
            {showBackButton && (
              <Box className="col-1">
                <Button2 text="Back" redirectTo="../support" />
              </Box>
            )}
            <Box className="container">
              <Box className="col-2">
                <Box className="sub_col_1">
                  <Box className="shop_details" onClick={(e) => handleClick(e)}>
                    <Box className="category">
                      <Typography className='sector_type'>{column.sector}</Typography>
                      <Typography className='shop_name'>{column.shopName}</Typography>
                    </Box>
                    <Box className="discount_percentage">
                      <Typography className='percent'>{column.discount}</Typography>
                      <Box className="discount_details">
                        <Typography className='text_1'>%</Typography>
                        <Typography className='text_2'>off</Typography>
                        <Typography className='text_3'>min purchase 1000</Typography>
                      </Box>
                    </Box>
                    <Box className="discount_coupon">
                      <Typography className='coupon'>coupon</Typography>
                      <Typography className='coupon_value'>{column.coupon}</Typography>
                    </Box>
                  </Box>
                  <ServicesTypeCard />
                  <Box className="product_details">
                    <Link to={`../1234/products`}>
                      <Typography variant="h3">Products:
                        <Typography variant="span">{column.products}</Typography>
                      </Typography>
                    </Link>
                  </Box>
                </Box>
                <Box className="sub_col_2">
                  <ShopDetails column={column} />
                  <VideoPlayer url={videoUrl} />
                </Box>
              </Box>
            </Box>
            <Box className="col-3"></Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default SingleShopPage;
