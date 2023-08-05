import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface MaxSelectionPopupProps {
  showPopup: boolean;
  handleClosePopup: () => void;
}

const MaxSelectionPopup: React.FC<MaxSelectionPopupProps> = ({ showPopup, handleClosePopup }): JSX.Element => {
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
