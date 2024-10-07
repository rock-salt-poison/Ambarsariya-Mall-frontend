import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import hanging_board from '../../Utils/images/Serve/emotional/eshop/hanging_board.webp'
import hanging_board2 from '../../Utils/images/Serve/emotional/eshop/hanging_board2.webp'
import { Link } from 'react-router-dom'
import pdf_icon from '../../Utils/images/Serve/emotional/merchant_campaign/pdf.png'
import main_content from '../../Utils/images/Serve/emotional/merchant_campaign/main_content.png'
import header_icon from '../../Utils/images/Serve/emotional/merchant_campaign/header.png'
import cta_icon from '../../Utils/images/Serve/emotional/campaign/community/icon_1.webp'
import result_icon from '../../Utils/images/Serve/emotional/merchant_campaign/res.png'
import submit_icon from '../../Utils/images/Serve/emotional/merchant_campaign/submit.png'

function MerchantCampaign() {

    const btnData = [
        {
            id: 1,
            btn_value: 'Create campaign name',
            iconSrc: pdf_icon,
        },
        {
            id: 2,
            btn_value: 'Select Shop Description & Attributes or Upload USP',
            iconSrc: pdf_icon,
        },
        {
            id: 3,
            btn_value: 'Main Content',
            iconSrc: main_content,
        },
        {
            id: 4,
            btn_value: 'Header',
            iconSrc: header_icon,
        },
        {
            id: 5,
            btn_value: 'Call to action',
            iconSrc: cta_icon,
        }
    ]

    const btns = (id, iconSrc, btn_value) => {
        return <Button className='btn' key={id}>
            <Box className="btn_container" >
                <Box className="icon_container">
                    <Box component="img" src={iconSrc} alt="icon" className="icon" />
                </Box>
                <Typography className='btn_value'>
                    {btn_value}
                </Typography>
            </Box>
        </Button>
    }

    const handleSubmit = () => {

    }

    return (
        <Box className="merchant_campaign_wrapper">
            <Box className="row">
                <Box className="col d-md-none">
                    <Box className="title_container">
                        <Box component="img" src={hanging_board} alt="board" className='hanging_board' />
                        <Typography className='title'>Shop No. 00001</Typography>
                    </Box>

                    {/* <Logo/> */}
                    <Link to='../emotional'>
                        <Typography variant='h2' className='heading'>Campaign</Typography>
                    </Link>

                    <Box className="title_container">
                        <Box component="img" src={hanging_board} alt="board" className='hanging_board' />
                        <Typography className='title'>Domain: Wholesaler</Typography>
                    </Box>
                </Box>

                <Box className="col d_lg_none">
                <Link to='../emotional'>
                        <Typography variant='h2' className='heading'>Campaign</Typography>
                    </Link>
                    <Box className="title_container">
                        <Box component="img" src={hanging_board2} alt="board" className='hanging_board2' />
                        <Typography className='title' variant='h2'>
                            <Typography className="heading" variant='span'>
                                Shop No: <Typography variant='span' className='values'>001</Typography>
                            </Typography>
                            <Typography className="heading" variant='span'>
                                Domain: <Typography variant='span' className='values'>Wholesale</Typography>
                            </Typography>
                        </Typography>
                    </Box>

                </Box>
                <Box className="col">
                    <Box className="col-8">
                        <Box className="board_pins">
                            <Box className="circle"></Box>
                            <Box className="circle"></Box>
                        </Box>

                        <Box className="container">
                            <Box className="sub-col-6">
                                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                    {btnData.map((btn) => {
                                        return btns(btn.id, btn.iconSrc, btn.btn_value);
                                    })}
                                    <Box className="btn_group">
                                        {btns(5, submit_icon, 'Submit')}
                                        {btns(6, result_icon, 'Result')}

                                    </Box>
                                </Box>
                            </Box>
                            <Box className="sub-col-4"></Box>
                        </Box>
                        <Box className="board_pins">
                            <Box className="circle"></Box>
                            <Box className="circle"></Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default MerchantCampaign