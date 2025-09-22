import React, { useState, useRef, useEffect, useMemo } from 'react';
import { chartink_strategy } from '../constants/ChartInkStrategy';
import { ColorCodes, FontSize } from '../constants/ColorCodes';
import { Box, Stack, Typography } from '@mui/material';

export default function Scanners({ hide }) {
  const [maxWidth, setMaxWidth] = useState(0);
  const boxRefs = useRef([]);

  const displayedStrategies = useMemo(
    () => chartink_strategy.filter((strategy) => strategy.display),
    []
  );

  const menuItems = useMemo(() => {
    const style = {
      borderRadius: '0.5rem',
      padding: '1rem',
      cursor: 'pointer',
      backgroundColor: ColorCodes.main,
      border: `1px solid ${ColorCodes.border}`,
      color: ColorCodes.text,
      fontSize: FontSize.text,
      whiteSpace: 'nowrap',
      flexShrink: 0, // Prevent shrinking in horizontal scroll
    };

    return displayedStrategies.map((strategy, index) => (
      <a
        key={strategy.name}
        href={strategy.link}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: 'none', color: ColorCodes.text }}
      >
        <Box
          ref={(el) => (boxRefs.current[index] = el)}
          onClick={hide}
          sx={{ ...style, width: maxWidth ? `${maxWidth}px` : 'auto' }}
        >
          <Typography fontWeight="bold">{strategy.name}</Typography>
        </Box>
      </a>
    ));
  }, [displayedStrategies, maxWidth, hide]);

  useEffect(() => {
    const widths = boxRefs.current.map((el) => el?.clientWidth || 0);
    if (widths.length) setMaxWidth(Math.max(...widths));
  }, [displayedStrategies]);

  return (
    <Box
      sx={{
        overflowX: 'auto', // Enable horizontal scroll
        width: '100%',
        py: 2,
        pl: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: 'flex',
          flexWrap: 'nowrap', // Keep items in one row
        }}
      >
        {menuItems}
      </Stack>
    </Box>
  );
}
