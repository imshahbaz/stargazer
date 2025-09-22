// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableRow from '@mui/material/TableRow';
// import { ColorCodes } from '../constants/ColorCodes.jsx';
// import { Grid, Divider, Paper } from '@mui/material';

// export default function StockDetailsTable(props) {
//   const style = { color: ColorCodes.text, backgroundColor: ColorCodes.main };

//   return (
//     <>
//       {props.show && (
//         <Paper>
//           <Grid item xs={12}>
//             <Divider color={ColorCodes.border} />
//           </Grid>
//           <TableContainer
//             component={Paper}
//             style={{
//               backgroundColor: ColorCodes.main,
//             }}
//           >
//             <Table aria-label="simple table" stickyHeader>
//               <TableBody>
//                 {props.rows.map((row) => (
//                   <TableRow
//                     key={row.name}
//                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                   >
//                     <TableCell
//                       component="th"
//                       scope="row"
//                       align="center"
//                       style={style}
//                     >
//                       {row.name}
//                     </TableCell>
//                     <TableCell align="center" style={style}>
//                       {row.margin}
//                     </TableCell>
//                     <TableCell align="center" style={style}>
//                       {row.price}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Grid item xs={12}>
//             <Divider color={ColorCodes.border} />
//           </Grid>
//         </Paper>
//       )}
//     </>
//   );
// }

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Divider,
  Grid,
} from '@mui/material';
import { ColorCodes } from '../constants/ColorCodes.jsx';

export default function StockDetailsTable({ show, rows }) {
  if (!show || !rows || rows.length === 0) return null;

  return (
    <Paper>
      <Grid item xs={12}>
        <Divider sx={{ borderColor: ColorCodes.border }} />
      </Grid>

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: ColorCodes.main }}
      >
        <Table stickyHeader aria-label="stock details table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  sx={{
                    color: ColorCodes.text,
                    backgroundColor: ColorCodes.main,
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: ColorCodes.text,
                    backgroundColor: ColorCodes.main,
                  }}
                >
                  {row.margin}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: ColorCodes.text,
                    backgroundColor: ColorCodes.main,
                  }}
                >
                  {row.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid item xs={12}>
        <Divider sx={{ borderColor: ColorCodes.border }} />
      </Grid>
    </Paper>
  );
}
