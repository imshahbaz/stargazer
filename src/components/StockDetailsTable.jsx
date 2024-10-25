import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { ColorCodes } from '../constants/ColorCodes.jsx';
import { Grid, Divider, Paper } from '@mui/material';

export default function StockDetailsTable(props) {
  const style = { color: ColorCodes.text, backgroundColor: ColorCodes.main };

  return (
    <>
      {props.show && (
        <Paper>
          <Grid item xs={12}>
            <Divider color={ColorCodes.border} />
          </Grid>
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
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      style={style}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center" style={style}>
                      {row.margin}
                    </TableCell>
                    <TableCell align="center" style={style}>
                      {row.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid item xs={12}>
            <Divider color={ColorCodes.border} />
          </Grid>
        </Paper>
      )}
    </>
  );
}
