import { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Troubleshoot as TroubleshootIcon,
  UploadFile as UploadFileIcon,
} from '@mui/icons-material';
import { ColorCodes, FontSize } from '../constants/ColorCodes';
import Scanners from '../components/Scanners';
import FileUpload from '../components/FileUpload';
import SearchIcon from '@mui/icons-material/Search';

const CarousalBar = ({ drawer }) => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleToggle = (component) => {
    if (component === 'drawersearch') {
      drawer.toggle(true);
    } else {
      setActiveComponent((prev) => (prev === component ? null : component));
    }
  };

  const buttons = [
    {
      key: 'scanner',
      label: 'Scanners',
      icon: <TroubleshootIcon fontSize="small" />,
    },
    {
      key: 'file',
      label: 'Upload File',
      icon: <UploadFileIcon fontSize="small" />,
    },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1, color: ColorCodes.text }}>
      {/* Buttons Row (Responsive) */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }} // ✅ column on mobile, row on tablet+
        spacing={2}
        sx={{
          pl: 1,
          pb: 1,
          alignItems: { xs: 'stretch', sm: 'flex-start' }, // full-width buttons on mobile
        }}
      >
        {isMobile && (
          <Button
            fullWidth
            startIcon={<SearchIcon fontSize="small" />}
            onClick={() => handleToggle('drawersearch')}
            sx={{
              borderRadius: 2,
              padding: '0.6rem 1rem',
              textTransform: 'none',
              backgroundColor: ColorCodes.main,
              border: `1px solid ${ColorCodes.border}`,
              color: ColorCodes.text,
              fontSize: FontSize.text,
              fontWeight: 'bold',
              '&:hover': { backgroundColor: ColorCodes.hover },
            }}
          >
            Search
          </Button>
        )}

        {buttons.map((btn) => (
          <Button
            key={btn.key}
            fullWidth={true} // ✅ makes buttons stretch on mobile
            onClick={() => handleToggle(btn.key)}
            startIcon={btn.icon}
            sx={{
              borderRadius: 2,
              padding: '0.6rem 1rem',
              textTransform: 'none',
              backgroundColor:
                activeComponent === btn.key
                  ? ColorCodes.active
                  : ColorCodes.main,
              border: `1px solid ${ColorCodes.border}`,
              color: ColorCodes.text,
              fontSize: FontSize.text,
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: ColorCodes.hover,
              },
            }}
          >
            {btn.label}
          </Button>
        ))}
      </Stack>

      <Divider sx={{ my: 2, borderColor: ColorCodes.border }} />

      {activeComponent === 'scanner' && (
        <Scanners hide={() => setActiveComponent(null)} />
      )}
      {activeComponent === 'file' && <FileUpload sx={{ width: '100%' }} />}
    </Box>
  );
};

export default CarousalBar;
