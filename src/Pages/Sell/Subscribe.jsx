import React from 'react'
import { Box, Typography } from '@mui/material'
import tbody_vector from '../../Utils/images/Sell/products/tbody_vector.webp';
import Button2 from '../../Components/Home/Button2';
import { Link, useParams } from 'react-router-dom';

function Subscribe() {
    const { owner } = useParams();
    
    return (
        <Box className="subscribe_main_wrapper">
            <Box className="row">
                <Box className="col">
                <Button2 text={"Back"} redirectTo={`../${owner}/like-and-share`}/>
                    <Typography variant='h2' className='heading'>
                        <Typography variant='span' className="span_1">
                            {/* <Typography variant="span" className='heading_2'>Subscribe</Typography> -  */}
                            Apna Departmental</Typography>
                        <Typography variant='span' className="span_1">
                            Shop No:
                            <Typography variant='span' className='span_2'>123</Typography>
                        </Typography>
                    </Typography>
                <Button2 text={"Next"} redirectTo={`../${owner}/mou`}/>
                </Box>
                <Box className="col">
                    <Box className="sub_col"></Box>
                    <Box className="subscribe_wrapper">
                        <Box className="board_pins">
                            <Box className="circle"></Box>
                            <Box className="circle"></Box>
                        </Box>
                        
                        <Box className="subscribe_row">
                            <Link className="subscribe_col" to={`../${owner}/monthly/budget`}>
                                <Typography className="text">open</Typography>
                                <Box className="title_container">
                                    <Box component="img" src={tbody_vector}/>
                                    <Typography className="title">Monthly</Typography>
                                </Box>
                            </Link>

                            <Link className="subscribe_col" to={`../${owner}/daily/budget`}>
                                <Typography className="text">open</Typography>
                                <Box className="title_container">
                                    <Box component="img" src={tbody_vector}/>
                                    <Typography className="title">Daily</Typography>
                                </Box>
                            </Link>
                        </Box>
                        <Box className="subscribe_row" >
                            <Link className="subscribe_col" to={`../${owner}/weekly/budget`}>
                                <Typography className="text">open</Typography>
                                <Box className="title_container">
                                    <Box component="img" src={tbody_vector}/>
                                    <Typography className="title">Weekly</Typography>
                                </Box>
                            </Link>

                            <Link className="subscribe_col" to={`../${owner}/edit/budget`}>
                                <Typography className="text">open</Typography>
                                <Box className="title_container">
                                    <Box component="img" src={tbody_vector}/>
                                    <Typography className="title">Edit</Typography>
                                </Box>
                            </Link>
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
    )
}

export default Subscribe