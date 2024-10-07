import React from 'react'
import { Box } from '@mui/material'
import Header from '../../Components/Serve/SupplyChain/Header'
import life_icon from '../../Utils/images/Sell/esale/life/life_icon.png'
import member_icon from '../../Utils/images/Sell/esale/life/member_icon.png'

function Life() {
  return (
    <Box className='life_wrapper'>
        <Box className="row">
            <Header icon_1={life_icon} icon_2={member_icon} icon_1_link='../esale' icon_2_link='../user' title="Citizen dashboard" title_container={true} redirectTo='../esale'/>
        </Box>
    </Box>
  )
}

export default Life