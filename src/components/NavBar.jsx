import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { ColorCodes, FontSize, IconSize } from '../constants/ColorCodes';
import Logo from '../components/Logo';
import '../css/Scrollable.css';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SearchDrawer from './SearchDrawer';

export default function NavBar() {
  const [drawer, showDrawer] = useState(false);
  return (
    <Box sx={{ flexGrow: 1, color: ColorCodes.text }}>
      <SearchDrawer open={drawer} handleShow={showDrawer}></SearchDrawer>

      <Stack direction="row">
        <IconButton size="large" color="inherit" edge="start">
          <Logo></Logo>
        </IconButton>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ flexGrow: 1 }}
        ></Stack>
        <IconButton
          aria-label="search"
          color="inherit"
          style={{
            paddingRight: '1rem',
            marginBottom: '1rem',
            paddingTop: '1.5rem',
            fontSize: FontSize.header,
          }}
          onClick={() => showDrawer(true)}
        >
          <SearchIcon style={{ fontSize: IconSize.large }} />
        </IconButton>
      </Stack>
      <Stack
        spacing={3}
        direction="row"
        className="scrollable-content"
        style={{ paddingLeft: '1rem' }}
      ></Stack>
    </Box>
  );
}
