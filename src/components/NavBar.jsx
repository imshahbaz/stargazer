import React, { useState } from 'react';
import { Box, Stack, IconButton } from '@mui/material';
import { ColorCodes, FontSize, IconSize } from '../constants/ColorCodes';
import Logo from '../components/Logo';
import SearchIcon from '@mui/icons-material/Search';
import SearchDrawer from './SearchDrawer';
import '../css/Scrollable.css';

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => setDrawerOpen(open);

  return (
    <Box sx={{ flexGrow: 1, color: ColorCodes.text }}>
      {/* Search Drawer */}
      <SearchDrawer open={drawerOpen} handleShow={toggleDrawer} />

      {/* Top Nav */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ px: 2, py: 1 }}
      >
        {/* Logo */}
        <IconButton size="large" edge="start" color="inherit">
          <Logo />
        </IconButton>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Search Button */}
        <IconButton
          aria-label="search"
          color="inherit"
          onClick={() => toggleDrawer(true)}
          sx={{
            fontSize: FontSize.header,
            pr: 2,
            pt: 2,
          }}
        >
          <SearchIcon style={{ fontSize: IconSize.large }} />
        </IconButton>
      </Stack>

      {/* Scrollable Section (Optional content) */}
      <Stack
        direction="row"
        spacing={3}
        className="scrollable-content"
        sx={{ pl: 2 }}
      />
    </Box>
  );
}
