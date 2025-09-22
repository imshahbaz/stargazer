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
import '../css/HomePage.css';
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={10}>
          <UploadForm
            fileName={fileName}
            onSubmit={handleSubmit}
            onFileChange={handleFileChange}
            broker={broker}
            setBroker={setBroker} // <-- fixed
          />
        </Grid>
        <Grid item xs={12}>
          <StockDetailsTable show={showTable} rows={rows} fileName={fileName} />
        </Grid>
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
        p: 2,
        borderRadius: '2rem',
        backgroundColor: ColorCodes.main,
        mt: 2,
      }}
    >
      <Typography sx={{ color: ColorCodes.text, fontWeight: 'bold', mb: 2 }}>
        Upload Excel File
      </Typography>

      <form onSubmit={onSubmit}>
        <Box
          className="upload-input"
          onClick={() => document.getElementById('excel-file-input').click()}
        >
          <img
            src={upload}
            alt="Upload Excel File"
            className="upload-input-image"
          />
        </Box>

        {fileName && (
          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography sx={{ color: ColorCodes.text }}>
              Selected File: {fileName}
            </Typography>
          </Box>
        )}

        <Input
          type="file"
          required
          id="excel-file-input"
          onChange={onFileChange}
          inputProps={{ accept: '.xlsx' }}
          sx={{ display: 'none' }}
        />

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

        {fileName && (
          <Button
            type="submit"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{
              width: '70%',
              borderRadius: '1rem',
              color: ColorCodes.text,
              border: '2px solid ' + ColorCodes.border,
              fontWeight: 'bold',
              display: 'block',
              mx: 'auto',
              mt: 2,
            }}
          >
            Upload
          </Button>
        )}
      </form>
    </Paper>
  );
}
