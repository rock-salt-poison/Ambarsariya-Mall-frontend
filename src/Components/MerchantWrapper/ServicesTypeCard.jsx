import { Box, Typography } from '@mui/material'
import React from 'react'
import '../../styles/variables.scss'
import shop_detail_book_img from '../../Utils/images/Sell/merchant_details/books.webp'
import shop_detail_prepair_services_img from '../../Utils/images/Sell/merchant_details/stationry_img_1.png'
import shop_detail_service_type_img from '../../Utils/images/Sell/merchant_details/paint_palette_img.webp'
import { Link } from 'react-router-dom'

// var book_img_src = 'var(--shop_detail_book_img)';
// const shopDetailBookImg = require('../../styles/variables.scss').$shop_detail_book_img;

const data = [
    {id:1,type:'Products', link:`../id/products`, imgSrc:shop_detail_book_img},
    {id:2,type:'Prepaid / Postpaid', link:`../id/prepaid-services`, imgSrc:shop_detail_prepair_services_img},
    {id:3,type:'Service Type', link:`../id/service-type`, imgSrc:shop_detail_service_type_img},
]
function ServicesTypeCard() {
  return (
    <Box className="services_type_wrapper">
        {
            data.map((service)=>{
                return (
                    <Link className="card" key={service.id} to={service.link}>
                    <Box className="card_body">
                        <Box component="img" src={service.imgSrc} className='product_img'/>
                        <Typography className='text'>{service.type}</Typography>
                    </Box>
                </Link>
                )
            })
        }
    </Box>
  )
}

export default ServicesTypeCard