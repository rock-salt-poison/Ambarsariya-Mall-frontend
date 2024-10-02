import React from 'react'
import { Box } from '@mui/material'
import Button2 from '../../Components/Home/Button2'
import LoginPageCard from '../../Components/Login/LoginPageCard'
import lion_img from '../../Utils/images/Sell/login/lion.webp'
import peacock_img from '../../Utils/images/Sell/login/peacock.webp'

function Login() {
  return (
    <Box className="login_wrapper">
        <Box className="container">
            <Box className="col">
                <Button2 text="Back" redirectTo="/AmbarsariyaMall/sell" />
            </Box>
            <Box className="col">
                <LoginPageCard title="Sell" imgSrc={peacock_img} redirectTo="eshop"/>
            </Box>
            <Box className="col">
                <LoginPageCard title="Buy" imgSrc={lion_img} redirectTo="esale"/>
            </Box>
        </Box>
    </Box>
  )
}

export default Login