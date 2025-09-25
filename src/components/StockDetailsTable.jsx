import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Divider,
  Box,
} from '@mui/material';
import { ColorCodes } from '../constants/ColorCodes.jsx';

export default function StockDetailsTable({ show, rows }) {
  if (!show || !rows || rows.length === 0) return null;

  return (
    <Box sx={{ width: '100%', mt: 2, px: { xs: 1, sm: 2, md: 4 } }}>
      {/* Top Divider */}
      <Divider sx={{ borderColor: ColorCodes.border, mb: 1 }} />

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          backgroundColor: ColorCodes.main,
          overflowX: 'auto', // horizontal scroll on mobile
        }}
      >
        <Table
          stickyHeader
          aria-label="stock details table"
          sx={{
            minWidth: 300, // ensures columns have minimum width
            tableLayout: 'auto', // allow proportional scaling
          }}
        >
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  sx={{
                    color: ColorCodes.text,
                    backgroundColor: ColorCodes.main,
                    minWidth: 100, // minimum width for this column
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: ColorCodes.text,
                    backgroundColor: ColorCodes.main,
                    minWidth: 80,
                  }}
                >
                  {row.margin}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: ColorCodes.text,
                    backgroundColor: ColorCodes.main,
                    minWidth: 80,
                  }}
                >
                  {row.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bottom Divider */}
      <Divider sx={{ borderColor: ColorCodes.border, mt: 1 }} />
    </Box>
  );
}
