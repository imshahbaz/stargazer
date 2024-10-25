import React from 'react';
import { chartink_strategy } from '../constants/ChartInkStrategy';
import { ColorCodes, FontSize } from '../constants/ColorCodes';
import { Box, Stack, Typography } from '@mui/material';
import { useState, useRef, useEffect, useMemo } from 'react';

export default function Scanners(props) {
  const [maxWidth, setMaxWidth] = useState(0);
  const boxRefs = useRef([]);

  const displayedStrategies = useMemo(() => {
    return chartink_strategy.filter((strategy) => strategy.display);
  }, []);

  const menuItems = useMemo(() => {
    const style = {
      borderRadius: '0.5rem',
      padding: '1rem',
      cursor: 'default',
      backgroundColor: ColorCodes.main,
      border: '1px solid ' + ColorCodes.border,
      color: ColorCodes.text,
      fontSize: FontSize.text,
    };

    return displayedStrategies.map((strategy, index) => {
      return (
        <a
          href={strategy.link}
          target="_blank"
          style={{ textDecoration: 'none', color: ColorCodes.text }}
          rel="noreferrer"
          key={strategy.name}
        >
          <Box
            key={strategy.name}
            style={{ ...style, width: maxWidth ? `${maxWidth}px` : 'auto' }}
            ref={(el) => (boxRefs.current[index] = el)}
            onClick={props.hide}
          >
            <Typography style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
              {strategy.name}
            </Typography>
          </Box>
        </a>
      );
    });
  }, [maxWidth, displayedStrategies, props.hide]);

  useEffect(() => {
    const widths = boxRefs.current.map((box) => box?.clientWidth || 0);
    const maxBoxWidth = Math.max(...widths);
    setMaxWidth(maxBoxWidth);
  }, [displayedStrategies]);

  return (
    <Stack
      spacing={4}
      direction="row"
      className="scrollable-content"
      style={{ paddingLeft: '1rem', marginTop: '1rem', marginBottom: '1rem' }}
    >
      {menuItems}
    </Stack>
  );
}
