import React from 'react';
import { ColorCodes, FontSize } from '../constants/ColorCodes';
import jaguarlogo from '../images/starlogo.png';
import { Box, Typography } from '@mui/material';

export default function Logo() {
  const style = {
    height: '3rem',
    width: '3rem',
    borderRadius: '50%',
    border: '2px solid' + ColorCodes.border,
    padding: '2px',
  };

  return (
    <Box
      style={{
        paddingLeft: '1rem',
        marginBottom: '1rem',
        paddingTop: '1rem',
        verticalAlign: 'middle',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
      }}
    >
      <img src={jaguarlogo} alt="Jaguar Trading" style={style}></img>
      <Typography
        style={{
          color: ColorCodes.text,
          marginLeft: '12px',
          fontFamily: 'Times New Roman',
          fontSize: FontSize.header,
          cursor: 'default',
        }}
      >
        Star Gazer
      </Typography>
    </Box>
  );
}
