import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  TextField,
  Typography,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { ColorCodes, FontSize, IconSize } from '../constants/ColorCodes';
import { searchMargin } from '../utils/FileUtils';
import ProfitCalculator from './ProfitCalculator';

export default function SearchDrawer({ open, handleShow }) {
  const [searchResult, setSearchResult] = useState({ query: '', list: [] });
  const [selectedRow, setSelectedRow] = useState(null);
  const textFieldRef = useRef(null);

  useEffect(() => {
    if (open && textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [open]);

  const handleChange = (e) => {
    const list = searchMargin(e.target.value);
    setSearchResult({ query: e.target.value, list });
  };

  const toggleDrawer = () => {
    handleShow(!open);
    setSearchResult({ query: '', list: [] });
    setSelectedRow(null);
  };

  const handleRowClick = (row) => {
    setSelectedRow((prev) => (prev?.symbol === row.symbol ? null : row));
  };

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        flexGrow: 1,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '100%',
          backgroundColor: ColorCodes.main,
        },
      }}
    >
      <Box sx={{ pt: 0.5 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft
              sx={{ fontSize: IconSize.large, color: ColorCodes.element }}
            />
          </IconButton>
          <TextField
            inputRef={textFieldRef}
            value={searchResult.query}
            placeholder="Search Margin"
            fullWidth
            autoComplete="off"
            autoFocus
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' } },
              '& .MuiOutlinedInput-input': { color: ColorCodes.text },
            }}
          />
        </Stack>

        <Divider sx={{ borderColor: ColorCodes.border }} />

        {searchResult.list.length > 0 && (
          <PopulateSearch
            rows={searchResult.list}
            selectedRow={selectedRow}
            onRowClick={handleRowClick}
          />
        )}
      </Box>
    </Drawer>
  );
}

const PopulateSearch = ({ rows, onRowClick, selectedRow }) => {
  return (
    <Paper>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: ColorCodes.main }}
      >
        <Table stickyHeader aria-label="search-table">
          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={row.symbol}>
                <TableRow
                  onClick={() => onRowClick(row)}
                  sx={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    '&:last-child td': { border: 0 },
                  }}
                >
                  <TableCell align="center" sx={{ color: ColorCodes.text }}>
                    <Typography sx={{ fontSize: FontSize.text }}>
                      {row.symbol}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ color: ColorCodes.text }}>
                    {row.leverage}
                  </TableCell>
                </TableRow>

                {selectedRow?.symbol === row.symbol && (
                  <TableRow>
                    <TableCell colSpan={2} sx={{ border: 'none', p: 1 }}>
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: ColorCodes.inputBackground,
                          borderRadius: 2,
                        }}
                      >
                        <ProfitCalculator
                          defaultValues={{
                            leverage: row.leverage,
                            buyPrice: '',
                            sellPrice: '',
                            quantity: '',
                            daysHeld: '',
                            symbol: row.symbol,
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{ borderColor: ColorCodes.border }} />
    </Paper>
  );
};
