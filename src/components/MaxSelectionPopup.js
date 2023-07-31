import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const MaxSelectionPopup = ({ showPopup, handleClosePopup }) => {
  return (
    <Dialog open={showPopup} onClose={handleClosePopup}>
      <DialogTitle>Maximum Selection Limit Reached</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can select up to 3 stocks from the dropdown.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClosePopup} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MaxSelectionPopup;
