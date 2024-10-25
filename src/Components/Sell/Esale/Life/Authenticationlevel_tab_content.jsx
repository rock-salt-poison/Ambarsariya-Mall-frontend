import React from 'react'
import { Box, Slider, Typography } from '@mui/material'

function Authenticationlevel_tab_content({ title, communityData }) {

    const marks = [
        { value: 0, label: 'Start' },
        { value: 1, label: 'Mid' },
        { value: 2, label: 'End' }
    ];
      
    const onSliderChange = (e, newValue, name) => {
    console.log(`Slider "${name}" changed to:`, newValue);
    // Handle the slider value update logic here
    };
      
    return (
        <Box className="tab_content">
            <Typography className="title">{title}</Typography>
            <Box className="content">
                <Box className="list">
                    <Typography className='heading'>Authentication level</Typography>

                    <Slider
                        onChange={(e, newValue) => onSliderChange(e, newValue)}
                        min={0}
                        max={marks.length - 1}
                        step={0.1}
                        marks={marks}
                        size={"large"}
                        className='input_field' // Apply the custom className
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Authenticationlevel_tab_content