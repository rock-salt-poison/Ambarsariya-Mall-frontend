import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import pickup from '../../Utils/images/Sell/shop_details/pickup.svg';
import pickup_highlighted from '../../Utils/images/Sell/shop_details/pickup_highlight.svg'; 
import delivery from '../../Utils/images/Sell/shop_details/delivery.webp';
import delivery_highlighted from '../../Utils/images/Sell/shop_details/delivery_highlight.svg'; 
import home_visit from '../../Utils/images/Sell/shop_details/home_visit.svg';
import home_visit_highlighted from '../../Utils/images/Sell/shop_details/home_visit_highlight.svg'; 
import { Link } from 'react-router-dom'

const services = [
    {id: 1, type:'Pickup', icon:pickup, imgSrcHighlighted: pickup_highlighted},
    {id: 2, type:'Delivery', icon:delivery, imgSrcHighlighted: delivery_highlighted},
    {id: 3, type:'Home Visit', icon:home_visit, imgSrcHighlighted: home_visit_highlighted},
]

function TypeOfServices() {
    const [selectedServices, setSelectedServices] = useState(new Set());

    const handleServiceTypeClick = (e, serviceId) => {
        const target = e.target.closest(".col");
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
        target.classList.toggle("active");
    };


  return (
    <Box className="services_wrapper">
        <Typography variant="h2">Type of services</Typography>
        <Box className="services_container">
            {/* {
                services.map((service)=>{
                    return  <Link className="col" key={service.id}>
                                <Box component="img" src={service.icon} className='service_icon'/>
                                <Typography className='service_type'> {service.type}</Typography>
                            </Link>
                })
            }        */}

            {services.map((item) => (
                            <Link
                                key={item.id}
                                onClick={(e) => handleServiceTypeClick(e, item.id)}
                                className={`col`}
                            >
                                <Box
                                    component="img"
                                    src={selectedServices.has(item.id) ? item.imgSrcHighlighted : item.icon}
                                    alt={item.type}
                                    className={`service_icon`}
                                />
                                 <Typography className='service_type'> {item.type}</Typography>
                            </Link>
                        ))}    
        </Box>
    </Box>
  )
}

export default TypeOfServices