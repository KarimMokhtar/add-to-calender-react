import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import AddToCalendarBtn from './AddToCalendarBtn';

export default function App() {
  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add To Calendar - React App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="div" sx={{ p: 3 }}>
        <AddToCalendarBtn />
      </Box>
    </div>
  );
}
