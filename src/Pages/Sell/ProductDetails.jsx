import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Button2 from '../../Components/Home/Button2';
import tshirt from '../../Utils/images/Sell/products/tshirt.jpg';

function ProductDetails() {

    const { id, owner } = useParams();
    console.log(owner, id)
    const row = {
        id: id,
        variations: 'Color',
        specifications: 'round neck',
        product: 'T-Shirt',
        brand: 'Couton conty',
        price: '1999',
        discount: '10%',
        sample: tshirt,
    };


    const RenderComponent = ({title, bgColor}) => {
       return <Box className="points">
            <Box className="point">
                <Box className="circle"></Box>
                <Box className="line"></Box>
                <Box className="small_circle" sx={{ background: bgColor }}></Box>
            </Box>
            <Link>
                <Typography variant='h2' sx={{ background: bgColor }}>{title}</Typography>
            </Link>
        </Box>
    }

    return (
        <Box className='products_wrapper'>
            <Box className="row">
                <Box className="col">
                    <Box className="sub_col">
                        <Button2 text={"Back"} redirectTo={`../${owner}/products`} />
                    </Box>
                    <Box className="sub_col">
                        <Typography variant='h2' className='heading'>
                            Product
                        </Typography>
                    </Box>
                    <Box className="sub_col"></Box>
                </Box>
                <Box className="col">
                    <Box className="sub_col"></Box>
                    <Box className="product_data">
                        <Box className="board_pins">
                            <Box className="circle"></Box>
                            <Box className="circle"></Box>
                        </Box>
                        <Box className="row_1">
                            <Box className="product_img">
                                <Box component="img" src={row.sample} />
                            </Box>
                            <Box className="product_details">
                               <RenderComponent bgColor='linear-gradient(to right, #1B98BA, #0BC8AF)' title="Brand Catalogue"/>
                               <RenderComponent bgColor='linear-gradient(to right, #6E0080, #E1008B)' title="Product Catalogue"/>
                               <RenderComponent bgColor='linear-gradient(to right, #E72D75, #FCBE0B)' title="Add item in supply"/>
                               <RenderComponent bgColor='linear-gradient(to right, #074589, #2C96C4)' title="Similar options"/>


                            </Box>


                        </Box>
                        <Box className="row_1">
                            <Box className="product_description">
                                <Typography variant='h3'>
                                    <Typography variant='span'>
                                        {row.product}, {row.brand}, {row.specifications}
                                    </Typography>
                                    <Typography variant='span'>
                                        &#8377; 1500
                                    </Typography>
                                </Typography>
                            </Box>
                        </Box>
                        <Box className="board_pins">
                            <Box className="circle"></Box>
                            <Box className="circle"></Box>
                        </Box>

                    </Box>
                    <Box className="sub_col"></Box>
                </Box>
            </Box>
        </Box>
    );
}

export default ProductDetails;
