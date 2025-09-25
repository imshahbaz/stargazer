import React, { useState } from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import { Box, Stack } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => setDrawerOpen(!drawerOpen);

  return (
    <BrowserRouter>
      <Box className="App" sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          <NavBar drawer={{ open: drawerOpen, toggle: toggleDrawer }}></NavBar>
          <Routes>
            <Route
              path="/"
              element={
                <Homepage drawer={{ open: drawerOpen, toggle: toggleDrawer }} />
              }
            />
          </Routes>
        </Stack>
      </Box>
    </BrowserRouter>
  );
}

export default App;
