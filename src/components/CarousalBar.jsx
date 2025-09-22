import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
  Troubleshoot as TroubleshootIcon,
  UploadFile,
} from '@mui/icons-material';
import { ColorCodes, FontSize } from '../constants/ColorCodes';
import Scanners from '../components/Scanners';
import FileUpload from '../components/FileUpload';

const CarousalBar = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);

  const toggleDisplay = (element) => {
    if (element === 'scanner') {
      setShowScanner((prev) => !prev);
      setShowFileUpload(false);
    } else if (element === 'file') {
      setShowFileUpload((prev) => !prev);
      setShowScanner(false);
    }
  };

  const buttonStyle = {
    borderRadius: 2,
    padding: '0.8rem 1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: ColorCodes.main,
    border: `1px solid ${ColorCodes.border}`,
    color: ColorCodes.text,
    fontSize: FontSize.text,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  };

  return (
    <Box sx={{ flexGrow: 1, color: ColorCodes.text }}>
      <Stack
        direction="row"
        spacing={3}
        className="scrollable-content"
        sx={{ pl: 1 }}
      >
        <Box sx={buttonStyle} onClick={() => toggleDisplay('scanner')}>
          <TroubleshootIcon fontSize="small" />
          <Typography>Scanners</Typography>
        </Box>
        <Box sx={buttonStyle} onClick={() => toggleDisplay('file')}>
          <UploadFile fontSize="small" />
          <Typography>Upload File</Typography>
        </Box>
      </Stack>

      {showScanner && <Scanners hide={() => setShowScanner(false)} />}
      {showFileUpload && <FileUpload />}
    </Box>
  );
};

export default CarousalBar;
