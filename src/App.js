import React from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import { Box, Stack } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <Box className="App" sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </Stack>
      </Box>
    </BrowserRouter>
  );
}

export default App;
