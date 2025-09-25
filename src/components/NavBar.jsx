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
    <Box
      sx={{
        flexGrow: 1,
        color: ColorCodes.text,
        position: 'sticky',
        top: 0,
        zIndex: 1100, // above other content
        backgroundColor: ColorCodes.main,
        borderBottom: `1px solid ${ColorCodes.border}`,
      }}
    >
      {/* Search Drawer */}
      <SearchDrawer open={drawerOpen} handleShow={toggleDrawer} />

      {/* Top Nav */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 1, sm: 2 }}
        sx={{ px: { xs: 1, sm: 2 }, py: { xs: 0.5, sm: 1 } }}
      >
        {/* Logo */}
        <IconButton size="large" edge="start" color="inherit" sx={{ p: 0 }}>
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
            fontSize: { xs: FontSize.text, sm: FontSize.header },
            pr: { xs: 1, sm: 2 },
            pt: { xs: 1, sm: 2 },
          }}
        >
          <SearchIcon
            sx={{ fontSize: { xs: IconSize.medium, sm: IconSize.large } }}
          />
        </IconButton>
      </Stack>

      {/* Optional Scrollable Section */}
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 3 }}
        className="scrollable-content"
        sx={{ pl: { xs: 1, sm: 2 } }}
      />
    </Box>
  );
}
