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

export default function SearchDrawer(props) {
  const [result, setResult] = useState({
    query: '',
    list: [],
  });

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
  }

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
          <PopulateSearch rows={result.list}></PopulateSearch>
        )}
      </Box>
    </Drawer>
  );
}

const PopulateSearch = (props) => {
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
            {props.rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  textAlign: 'left',
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={style}
                  sx={{ textAlign: 'center' }}
                >
                  <Typography sx={{ fontSize: FontSize.text }}>
                    {row.name}
                  </Typography>
                  <Typography sx={{ fontSize: FontSize.text }}>
                    {row.symbol}
                  </Typography>
                </TableCell>
                <TableCell align="center" style={style}>
                  {row.percent}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{ color: ColorCodes.border }}></Divider>
    </Paper>
  );
};
