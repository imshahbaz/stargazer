import React from 'react';
import { ColorCodes, FontSize } from '../constants/ColorCodes';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import Scanners from '../components/Scanners';
import { UploadFile } from '@mui/icons-material';
import FileUpload from '../components/FileUpload';

export default function CarousalBar() {
  const style = {
    borderRadius: '0.5rem',
    padding: '1rem',
    cursor: 'default',
    backgroundColor: ColorCodes.main,
    border: '1px solid ' + ColorCodes.border,
    color: ColorCodes.text,
    fontSize: FontSize.text,
  };

  const [show, setShow] = useState(false);
  const [fileUploadflag, setFileUploadFlag] = useState(false);

  const hide = () => setShow(false);

  const display = (element) => {
    if (element === 'search') {
      setShow(false);
      setFileUploadFlag(!fileUploadflag);
    } else if (element === 'scanner') {
      setShow(!show);
      setFileUploadFlag(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, color: ColorCodes.text }}>
      <Stack
        spacing={3}
        direction="row"
        className="scrollable-content"
        style={{ paddingLeft: '1rem' }}
      >
        <Box
          style={{ ...style, verticalAlign: 'middle', display: 'flex' }}
          onClick={() => display('scanner')}
        >
          <TroubleshootIcon style={{ marginRight: '3px' }}></TroubleshootIcon>
          <Typography style={{ fontWeight: 'bold' }}>Scanners</Typography>
        </Box>
        <Box
          style={{ ...style, verticalAlign: 'middle', display: 'flex' }}
          onClick={() => display('search')}
        >
          <UploadFile style={{ marginRight: '3px' }}></UploadFile>
          <Typography style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
            Upload File
          </Typography>
        </Box>
      </Stack>

      {show && <Scanners hide={hide}></Scanners>}
      {fileUploadflag && <FileUpload></FileUpload>}
    </Box>
  );
}
