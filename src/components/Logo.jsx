import React from 'react';
import { ColorCodes, FontSize } from '../constants/ColorCodes';
import jaguarlogo from '../images/st.jpg';
import { Box, Typography } from '@mui/material';

export default function Logo() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: { xs: 1, sm: 1.5 }, // smaller gap on mobile
        py: { xs: 1, sm: 1 },
        pl: { xs: 1, sm: 1 },
        mb: { xs: 1, sm: 1 },
      }}
    >
      <Box
        component="img"
        src={jaguarlogo}
        alt="Jaguar Trading"
        sx={{
          height: { xs: '3rem', sm: '4rem' }, // mobile 3rem, desktop 4rem
          width: { xs: '3rem', sm: '4rem' },
          borderRadius: '50%',
          border: `2px solid ${ColorCodes.border}`,
          p: '2px',
        }}
      />
      <Typography
        sx={{
          color: ColorCodes.text,
          fontFamily: 'Times New Roman',
          fontSize: { xs: '2rem', sm: FontSize.header }, // smaller on mobile
          cursor: 'default',
        }}
      >
        Shahbaz Trades
      </Typography>
    </Box>
  );
}
