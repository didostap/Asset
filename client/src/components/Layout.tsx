import React, { FC, Suspense } from 'react';
import { Box, LinearProgress } from '@mui/material';
import Menu from './Menu';
import Header from './Header';
import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  const data = useAuth();

  return (
    <Box display="flex">
      <Menu />
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <Header user={data.user} />
        <Box component="main" pl="4rem" pr="4rem" flexGrow={1}>
          <Suspense fallback={<LinearProgress color="inherit" />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
