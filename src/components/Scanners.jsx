import { useMemo } from 'react';
import { chartink_strategy } from '../constants/ChartInkStrategy';
import { ColorCodes, FontSize } from '../constants/ColorCodes';
import { Box, Stack, Typography, Button } from '@mui/material';

export default function Scanners({ hide }) {
  const displayedStrategies = useMemo(
    () => chartink_strategy.filter((strategy) => strategy.display),
    []
  );

  return (
    <Box
      sx={{
        width: '100%',
        py: 2,
        pl: { xs: 0, sm: 2 },
        overflowX: 'auto', // horizontal scroll on mobile
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }} // vertical on mobile, horizontal on desktop
        spacing={2}
        sx={{ flexWrap: 'nowrap' }}
      >
        {displayedStrategies.map((strategy) => (
          <Button
            key={strategy.name}
            href={strategy.link}
            target="_blank"
            rel="noreferrer"
            onClick={hide}
            sx={{
              borderRadius: '0.5rem',
              padding: '1rem',
              backgroundColor: ColorCodes.main,
              border: `1px solid ${ColorCodes.border}`,
              color: ColorCodes.text,
              fontSize: FontSize.text,
              fontWeight: 'bold',
              textTransform: 'none',
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: ColorCodes.hover,
              },
            }}
          >
            <Typography>{strategy.name}</Typography>
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
