import { Box, Stack, IconButton } from '@mui/material';
import { ColorCodes, FontSize, IconSize } from '../constants/ColorCodes';
import Logo from '../components/Logo';
import SearchIcon from '@mui/icons-material/Search';
import SearchDrawer from './SearchDrawer';
import '../css/Scrollable.css';

export default function NavBar({ drawer }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        color: ColorCodes.text,
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        backgroundColor: ColorCodes.main,
        borderBottom: `1px solid ${ColorCodes.border}`,
        pb: { xs: 1, sm: 1.5 },
        pt: { xs: 1, sm: 1.5 },
      }}
    >
      {/* Search Drawer */}
      <SearchDrawer open={drawer.open} handleShow={drawer.toggle} />

      {/* Top Nav */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between" // ensures spacing between logo and search icon
        sx={{
          px: { xs: 1, sm: 2 },
          overflow: 'hidden', // prevent icons from overflowing
        }}
      >
        {/* Logo */}
        <IconButton size="large" edge="start" color="inherit" sx={{ p: 0 }}>
          <Logo />
        </IconButton>

        {/* Search Button */}
        <IconButton
          aria-label="search"
          color="inherit"
          onClick={() => drawer.toggle(true)}
          sx={{
            fontSize: { xs: FontSize.text, sm: FontSize.header },
            p: 0,
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <SearchIcon
            sx={{
              fontSize: { xs: IconSize.medium, sm: IconSize.large },
            }}
          />
        </IconButton>
      </Stack>
    </Box>
  );
}
