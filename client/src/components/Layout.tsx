import React, { FC } from 'react';
import { Box } from '@mui/material';
import Menu from './Menu';

const Layout: FC = ({ children }) => {
  return (
    <Box display="flex">
      <Menu />
      <Box
        component="main"
        sx={{ pl: '4rem', pr: '4rem', pt: '2.25rem', flexGrow: 1 }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
