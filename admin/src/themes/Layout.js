import * as React from 'react';
import { defaultTheme, Layout, AppBar, ToggleThemeButton } from 'react-admin';
import { createTheme, Box, Typography } from '@mui/material';
import { OpenGardenAdminMenu } from './Menu';
const darkTheme = createTheme({
  palette: { mode: 'dark' },
});

export const OpenGardenAdminBar = props => (
  <AppBar {...props}>
    <Box flex="1">
      <Typography variant="h6" id="react-admin-title"></Typography>
    </Box>

    <ToggleThemeButton
      lightTheme={defaultTheme}
      darkTheme={darkTheme}
    />
  </AppBar>
);

export const OpenGardenAdminLayout = props => <Layout {...props} menu={OpenGardenAdminMenu} appBar={OpenGardenAdminBar} />;
