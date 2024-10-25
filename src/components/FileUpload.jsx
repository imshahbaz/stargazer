import * as React from 'react';
import { Box, Grid, Button, Input, Paper, Typography } from '@mui/material';
import { useState } from 'react';
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
  const [showTable, setShowTable] = useState(false);
  const [rows, setRows] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [fileName, setFileName] = useState('');

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
    if (!file) return; // Prevent submission if no file is selected

    try {
      const data = await readXlsxFile(file);
      const processedData = handleData(data);
      if (processedData.length > 0) {
        setRows(processedData);
        setShowTable(true);
      } else {
        setShowTable(false);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error reading file:', error);
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={10}>
          <UploadForm
            fileName={fileName}
            onSubmit={handleSubmit}
            onFileChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12}>
          <StockDetailsTable show={showTable} rows={rows} fileName={fileName} />
        </Grid>
        <Grid item xs={12}>
          <AlertInfo
            open={showAlert}
            message="No stocks found for this strategy. Please choose a different strategy."
            handleClose={handleCloseAlert}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function UploadForm({ fileName, onSubmit, onFileChange }) {
  return (
    <Paper
      sx={{
        padding: '1rem',
        borderRadius: '2rem',
        backgroundColor: ColorCodes.main,
        marginTop: '1rem',
      }}
    >
      <Typography style={{ color: ColorCodes.text, fontWeight: 'bold' }}>
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
          <section className="filename-section">
            <span className="filename-span">Selected File: {fileName}</span>
          </section>
        )}
        <Input
          type="file"
          required
          style={{ margin: '1rem', display: 'none' }}
          onChange={onFileChange}
          inputProps={{ accept: '.xlsx' }}
          id="excel-file-input"
        />
        {fileName && (
          <Button
            variant="outlined"
            color="primary"
            style={{
              margin: '1rem',
              borderRadius: '1rem',
              width: '70%',
              color: ColorCodes.text,
              border: '2px solid ' + ColorCodes.border,
              fontWeight: 'bold',
            }}
            type="submit"
            size="large"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        )}
      </form>
    </Paper>
  );
}
