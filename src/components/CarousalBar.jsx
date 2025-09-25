import { useState } from 'react';
import { Box, Stack, Button, Divider } from '@mui/material';
import {
  Troubleshoot as TroubleshootIcon,
  UploadFile as UploadFileIcon,
} from '@mui/icons-material';
import { ColorCodes, FontSize } from '../constants/ColorCodes';
import Scanners from '../components/Scanners';
import FileUpload from '../components/FileUpload';

const CarousalBar = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleToggle = (component) => {
    setActiveComponent((prev) => (prev === component ? null : component));
  };

  const buttons = [
    {
      key: 'scanner',
      label: 'Scanners',
      icon: <TroubleshootIcon fontSize="small" />,
    },
    {
      key: 'file',
      label: 'Upload File',
      icon: <UploadFileIcon fontSize="small" />,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, color: ColorCodes.text }}>
      {/* Buttons Row (Responsive) */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }} // ✅ column on mobile, row on tablet+
        spacing={2}
        sx={{
          pl: 1,
          pb: 1,
          alignItems: { xs: 'stretch', sm: 'flex-start' }, // full-width buttons on mobile
        }}
      >
        {buttons.map((btn) => (
          <Button
            key={btn.key}
            fullWidth={true} // ✅ makes buttons stretch on mobile
            onClick={() => handleToggle(btn.key)}
            startIcon={btn.icon}
            sx={{
              borderRadius: 2,
              padding: '0.6rem 1rem',
              textTransform: 'none',
              backgroundColor:
                activeComponent === btn.key
                  ? ColorCodes.active
                  : ColorCodes.main,
              border: `1px solid ${ColorCodes.border}`,
              color: ColorCodes.text,
              fontSize: FontSize.text,
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: ColorCodes.hover,
              },
            }}
          >
            {btn.label}
          </Button>
        ))}
      </Stack>

      <Divider sx={{ my: 2, borderColor: ColorCodes.border }} />

      {/* Conditional Rendering */}
      {activeComponent === 'scanner' && (
        <Scanners hide={() => setActiveComponent(null)} />
      )}
      {activeComponent === 'file' && <FileUpload sx={{ width: '100%' }} />}
    </Box>
  );
};

export default CarousalBar;
