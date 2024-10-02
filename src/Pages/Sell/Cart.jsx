import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import po_stamp from '../../Utils/images/Sell/cart/po_stamp.svg';
import qr_code from '../../Utils/images/Sell/cart/qr_code.svg';
import CartTable from '../../Components/Cart/CartTable';
import badge_frame from '../../Utils/images/Sell/cart/badge_frame.svg';
import Button2 from '../../Components/Home/Button2';
import pickup from '../../Utils/images/Sell/shop_details/pickup.svg';
import pickup_highlighted from '../../Utils/images/Sell/shop_details/pickup_highlight.svg'; 
import delivery from '../../Utils/images/Sell/shop_details/delivery.webp';
import delivery_highlighted from '../../Utils/images/Sell/shop_details/delivery_highlight.svg'; 
import home_visit from '../../Utils/images/Sell/shop_details/home_visit.svg';
import home_visit_highlighted from '../../Utils/images/Sell/shop_details/home_visit_highlight.svg'; 
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Cart() {
    const sampleRows = useSelector((state) => state.cart.selectedProducts);

    const offers = [
        { id: 1, title: 'Special Offers' },
        { id: 2, title: 'Co-helpers' },
        { id: 3, title: 'Prepaid / Postpaid' },
        { id: 4, title: 'Purchase coupons' },
        { id: 5, title: 'Become Member' },
    ];

    const service_type = [
        { id: 1, imgSrc: pickup, imgSrcHighlighted: pickup_highlighted, service: 'pickup' },
        { id: 2, imgSrc: delivery, imgSrcHighlighted: delivery_highlighted, service: 'delivery' },
        { id: 3, imgSrc: home_visit, imgSrcHighlighted: home_visit_highlighted, service: 'home visit' }
    ];

    const [selectedServices, setSelectedServices] = useState(new Set());

    const handleServiceTypeClick = (e, serviceId) => {
        const target = e.target.closest(".service");
        setSelectedServices((prevSelectedServices) => {
            const newSelectedServices = new Set(prevSelectedServices);
            if (newSelectedServices.has(serviceId)) {
                newSelectedServices.delete(serviceId);
            } else {
                newSelectedServices.add(serviceId);
            }
            console.log('Selected Services:', Array.from(newSelectedServices));
            return newSelectedServices;
        });
        target.classList.toggle("increase_scale");

    };

    return (
        <Box className="cart_wrapper">
            <Box className="row">
                <Box className="col">
                    <Button2 text={"Back"} redirectTo={'id/products'} />
                    <Link to="../id/return">
                        <Box component="img" src={po_stamp} alt="p.o" className='po_stamp' />
                    </Link>
                    <Typography variant='h2' className='heading'>
                        <Typography variant='span' className="span_1">Apna Departmental</Typography>
                        <Typography variant='span' className="span_1">
                            Shop No:
                            <Typography variant='span' className='span_2'>123</Typography>
                        </Typography>
                    </Typography>

                    <Link to="../id/order">
                        <Box component="img" src={qr_code} alt="qr_code" className='qr_code' />
                    </Link>
                </Box>
                <Box className="col">
                    <Box className="sub_col"></Box>
                    <CartTable rows={sampleRows} />
                    <Box className="sub_col"></Box>
                </Box>
                <Box className="col">
                    <Button2 text={"Back"} redirectTo={'../id/products'} />
                    <Box className="offers">
                        {offers.map((item) => (
                            <Box className="offers_container" key={item.id}>
                                <Box component="img" src={badge_frame} alt="badge_frame" className='badge_frame' />
                                <Typography variant='h3' className='text_2'>{item.title}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box className="type_of_service">
                        {service_type.map((item) => (
                            <Box
                                key={item.id}
                                onClick={(e) => handleServiceTypeClick(e, item.id)}
                                className={`service `}
                            >
                                <Box
                                    component="img"
                                    src={selectedServices.has(item.id) ? item.imgSrcHighlighted : item.imgSrc}
                                    alt={item.service}
                                    className={`service_type`}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Cart;
