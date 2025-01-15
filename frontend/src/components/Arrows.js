import React from 'react'
import { IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

function NextArrow(props) {
    const { onClick } = props
    return (
        <IconButton
            style={{
                position: 'absolute',
                top: '50%',
                right: '-25px',
                transform: 'translateY(-50%)',
                zIndex: 2,
            }}
            onClick={onClick}>
            <ArrowForwardIosIcon style={{ color: '#000', fontSize: '2rem' }} />
        </IconButton>
    )
}

function PrevArrow(props) {
    const { onClick } = props
    return (
        <IconButton
            style={{
                position: 'absolute',
                top: '50%',
                left: '-25px',
                transform: 'translateY(-50%)',
                zIndex: 2,
            }}
            onClick={onClick}>
            <ArrowBackIosIcon style={{ color: '#000', fontSize: '2rem' }} />
        </IconButton>
    )
}

export { NextArrow, PrevArrow }
