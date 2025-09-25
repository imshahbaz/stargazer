import React, { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Input,
  Paper,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import readXlsxFile from 'read-excel-file';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import AlertInfo from '../components/AlertInfo';
import upload from '../images/upload.png';
import { handleData } from '../utils/FileUtils';
import { ColorCodes } from '../constants/ColorCodes';
import StockDetailsTable from './StockDetailsTable';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [broker, setBroker] = useState('ZERODHA');
  const [rows, setRows] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      selectedFile.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      alert('Please select a valid Excel file (.xlsx)');
      setFile(null);
      setFileName('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    try {
      const data = await readXlsxFile(file);
      const processedData = handleData(data, broker);
      if (processedData.length > 0) {
        setRows(processedData);
        setShowTable(true);
      } else {
        setRows([]);
        setShowTable(false);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error reading file:', error);
      setShowAlert(true);
    }
  };

  return (
    <Box sx={{ width: '100%', flexGrow: 1 }}>
      <Grid
        container
        direction="column" // ✅ ensure items stack vertically
        spacing={2}
        alignItems="center"
      >
        {!showTable && (
          <Grid item xs={12}>
            <UploadForm
              fileName={fileName}
              onSubmit={handleSubmit}
              onFileChange={handleFileChange}
              broker={broker}
              setBroker={setBroker}
            />
          </Grid>
        )}

        {showTable && (
          <Grid item xs={12} sx={{ width: '100%' }}>
            <StockDetailsTable
              rows={rows}
              fileName={fileName}
              show={showTable}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <AlertInfo
            open={showAlert}
            message="No stocks found for this strategy. Please choose a different strategy."
            handleClose={() => setShowAlert(false)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function UploadForm({ fileName, onSubmit, onFileChange, broker, setBroker }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '2rem',
        backgroundColor: ColorCodes.main,
        width: '100%',
        maxWidth: { xs: '100%', sm: 500, md: 700 },
        mx: 'auto',
        boxSizing: 'border-box',
        mt: 2,
      }}
    >
      <Typography
        sx={{
          color: ColorCodes.text,
          fontWeight: 'bold',
          mb: 2,
          textAlign: 'center',
        }}
      >
        Upload Excel File
      </Typography>

      <form onSubmit={onSubmit}>
        {/* Upload Image */}
        <Box
          onClick={() => document.getElementById('excel-file-input').click()}
          sx={{
            cursor: 'pointer',
            textAlign: 'center',
            width: { xs: '60%', sm: '150px', md: '200px' },
            mx: 'auto',
            mb: 2,
          }}
        >
          <img
            src={upload}
            alt="Upload Excel File"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </Box>

        {/* Selected File Name */}
        {fileName && (
          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography sx={{ color: ColorCodes.text, textAlign: 'center' }}>
              Selected File: {fileName}
            </Typography>
          </Box>
        )}

        {/* Hidden File Input */}
        <Input
          type="file"
          required
          id="excel-file-input"
          onChange={onFileChange}
          inputProps={{ accept: '.xlsx' }}
          sx={{ display: 'none' }}
        />

        {/* Broker Select */}
        <TextField
          select
          fullWidth
          label="Select Broker"
          value={broker}
          onChange={(e) => setBroker(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '1rem',
              color: ColorCodes.text,
              fontWeight: 'bold',
              '& fieldset': { borderColor: ColorCodes.border, borderWidth: 2 },
              '&:hover fieldset': { borderColor: ColorCodes.border },
              '&.Mui-focused fieldset': { borderColor: ColorCodes.border },
            },
            '& .MuiInputLabel-root': {
              color: ColorCodes.text,
              fontWeight: 'bold',
            },
          }}
        >
          <MenuItem value="MSTOCK">MSTOCK</MenuItem>
          <MenuItem value="ZERODHA">ZERODHA</MenuItem>
        </TextField>

        {/* Upload Button */}
        {fileName && (
          <Button
            type="submit"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{
              width: '100%',
              maxWidth: 400,
              borderRadius: '1rem',
              color: ColorCodes.text,
              border: `2px solid ${ColorCodes.border}`,
              fontWeight: 'bold',
              display: 'block',
              mx: 'auto',
              mt: 2,
              py: 1.5,
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            }}
          >
            Upload
          </Button>
        )}
      </form>
    </Paper>
  );
}
