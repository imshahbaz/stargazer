import React, { useEffect, useRef } from 'react';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ChevronLeft } from '@mui/icons-material';
import { ColorCodes, FontSize, IconSize } from '../constants/ColorCodes';
import { searchMargin } from '../utils/FileUtils';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import ProfitCalculator from './ProfitCalculator';

export default function SearchDrawer(props) {
  const [result, setResult] = useState({
    query: '',
    list: [],
  });
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const textFieldRef = useRef(null);

  const handleChange = (e) => {
    const result = searchMargin(e.target.value);
    console.log(result);
    setResult({
      query: e.target.value,
      list: result,
    });
  };

  function toggle() {
    props.handleShow(!props.open);
    setResult({ query: '', list: [] });
    setCalculatorOpen(false);
  }

  const handleRowClick = (row) => {
    if (calculatorOpen) {
      setSelectedRow(null);
    } else {
      setSelectedRow(row);
    }
    setCalculatorOpen(!calculatorOpen); // Open calculator
  };

  useEffect(() => {
    if (props.open) {
      textFieldRef.current.focus();
    }
  }, [props.open]);

  return (
    <Drawer
      sx={{
        flexGrow: 1,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '100%',
          backgroundColor: ColorCodes.main,
        },
      }}
      variant="persistent"
      anchor="right"
      open={props.open}
    >
      <Box sx={{ paddingTop: '.5rem' }}>
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          sx={{ flexGrow: 1 }}
        >
          <IconButton onClick={toggle}>
            <ChevronLeft
              style={{ fontSize: IconSize.large, color: ColorCodes.element }}
            />
          </IconButton>

          <TextField
            inputRef={textFieldRef}
            value={result.query}
            placeholder="Search Margin"
            fullWidth
            id="fullWidth"
            sx={{
              flexGrow: 1,
              color: ColorCodes.text,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
              '& .MuiOutlinedInput-input': {
                color: ColorCodes.text,
              },
            }}
            onChange={handleChange}
            autoComplete="off"
            autoFocus={true}
          />
        </Stack>
        <Divider color={ColorCodes.border}></Divider>
        {result.list.length > 0 && (
          <PopulateSearch
            rows={result.list}
            onRowClick={handleRowClick}
            selectedRow={selectedRow}
          ></PopulateSearch>
        )}
      </Box>
    </Drawer>
  );
}

const PopulateSearch = ({ rows, onRowClick, selectedRow }) => {
  const style = { color: ColorCodes.text };

  return (
    <Paper>
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: ColorCodes.main,
        }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={row.symbol}>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                  onClick={() => onRowClick(row)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    style={style}
                  >
                    <Typography sx={{ fontSize: FontSize.text }}>
                      {row.symbol}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" style={style}>
                    {row.leverage}
                  </TableCell>
                </TableRow>

                {selectedRow?.symbol === row.symbol && (
                  <Box
                    sx={{
                      mt: 1,
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
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{ color: ColorCodes.border }} />
    </Paper>
  );
};
