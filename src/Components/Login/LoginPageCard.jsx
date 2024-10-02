import { Box, Typography } from '@mui/material'
import React from 'react'
import LoginForm from './LoginForm'

function LoginPageCard({title, imgSrc, backButton, redirectTo}) {
    
  return (
    <Box className="card">
        {backButton}
        <Typography variant='h2' className='title'> 
            {title}
        </Typography>
        <Box className="form_container">
            <Box component="img" src={imgSrc} className="icon" alt="icon" />
            <LoginForm redirectTo={redirectTo}/>
        </Box>
    </Box>
  )
}

export default LoginPageCard