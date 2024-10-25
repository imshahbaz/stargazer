import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function AlertInfo(props) {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={props.handleClose}
        severity="info"
        style={{ width: '100%' }}
      >
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
}
