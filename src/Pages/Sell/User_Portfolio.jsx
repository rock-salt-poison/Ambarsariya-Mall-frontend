import React, { useState } from 'react'
import { Box, ThemeProvider, Typography } from '@mui/material'
import Card from '../../Components/UserPortfolio/RoutineCard/Card'
import avatar from '../../Utils/images/Sell/user_portfolio/female_user.png'
import UserPortfolio from '../../Components/Form/UserPortfolioForm'
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import details_icon from '../../Utils/images/Sell/user_portfolio/details_icon.svg'
import Button2 from '../../Components/Home/Button2'
import chain_links_icon from '../../Utils/images/Sell/user_portfolio/chain_links_icon.svg';
import AnimatedButton from '../../Components/UserPortfolio/AnimatedButton'
import services_icon from '../../Utils/images/Sell/user_portfolio/services_icon.svg'
import gmail_services_icon from '../../Utils/images/Sell/user_portfolio/gmail_services_icon.svg'
import social_links_icon from '../../Utils/images/Sell/user_portfolio/social_links_icon.svg'
import { Link } from 'react-router-dom'
import CardBoardPopup from '../../Components/CardBoardPopupComponents/CardBoardPopup'
import DetailsPopupContent from '../../Components/CardBoardPopupComponents/DetailsPopupContent'
import ServicesPopupContent from '../../Components/CardBoardPopupComponents/ServicesPopupContent'
import GmailServicesPopupContent from '../../Components/CardBoardPopupComponents/GmailServicesPopupContent'
import SocialLinksPopupContent from '../../Components/CardBoardPopupComponents/SocialLinksPopupContent'

function User_Portfolio(props) {
    const [openPopup, setOpenPopup] = useState(false);
    const themeProps = {
        popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
        scrollbarThumb:'var(--brown)'
    };

    const theme = createCustomTheme(themeProps);

    const buttonsData = [
        {
            id: 1,
            title: 'Services',
            imgSrc: services_icon,
            popup_body_content: <ServicesPopupContent />
        },
        {
            id: 2,
            title: 'Gmail Services',
            imgSrc: gmail_services_icon,
            description: 'By This service Enabling you are giving permission to your G-contacts, G-MAPS, G-calendar, G-meet and ETC.',
            popup_body_content: (desc) => <GmailServicesPopupContent description={desc} />
        },
        {
            id: 3,
            title: 'Social Links',
            imgSrc: social_links_icon,
            popup_body_content: <SocialLinksPopupContent />
        },
    ]

    const handleClick = () => {
        setOpenPopup(true);
    }

    const handleClose = () => {
        setOpenPopup(false);
    }
    return (
        <ThemeProvider theme={theme}>
            <Box className="user_portfolio_wrapper">
                <Box className="row">
                    <Box className="col">
                        <Box className="heading_container">
                            <Typography variant="h2" className="heading">User Portfolio</Typography>
                            <Box className="line"></Box>
                        </Box>
                        <Box className="user_details_container">
                            <Box className="avatar_container">
                                <Box component="img" src={avatar} className="avatar" alt="image" />
                            </Box>
                            <Box className="form_container">
                                <UserPortfolio />
                            </Box>
                        </Box>
                        <Box className="details2">
                            <Link onClick={handleClick}>
                                <Box component="img" src={details_icon} alt="details" className='details' />
                            </Link>
                            <Box component="img" src={chain_links_icon} alt="details" className='chain_icon' />
                            <Box className="btn_container">
                                {buttonsData.map((btn) => {
                                    return <AnimatedButton key={btn.id} imgSrc={btn.imgSrc} text={btn.title} popup_body_content={typeof btn.popup_body_content === "function"? btn.popup_body_content(btn.description) : btn.popup_body_content} />
                                })}
                            </Box>
                        </Box>

                        <Box className="forward_backward_button_container">
                            <Button2 text="Back" redirectTo="/AmbarsariyaMall/sell" />
                            <Button2 text="Next" redirectTo="../esale" />
                        </Box>

                    </Box>
                    <Box className="col">
                        <Card />
                    </Box>
                </Box>
                <CardBoardPopup open={openPopup} handleClose={handleClose} title="Details" body_content={<DetailsPopupContent />} />
            </Box>
        </ThemeProvider>
    )
}

export default User_Portfolio