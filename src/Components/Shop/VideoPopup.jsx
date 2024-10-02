import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import ReactPlayer from 'react-player';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, IconButton, ThemeProvider, useMediaQuery } from '@mui/material';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';

export default function VideoPopup({ open, handleClose }, props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const themeProps = {
    popoverBackgroundColor: props.popoverBackgroundColor || 'var(--pink2)',
};

const theme2 = createCustomTheme(themeProps);

  return (
    <ThemeProvider theme={theme2}>
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <Box position="relative">
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
              zIndex: 1
            }}
          >
            <CloseIcon />
          </IconButton>
          <ReactPlayer url="https://www.youtube.com/" playing controls width="100%" height="100%" className="videoPlayer" />
        </Box>
      </DialogContent>
      {/* <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions> */}
    </Dialog>
    </ThemeProvider>
  );
}
