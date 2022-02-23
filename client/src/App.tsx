import { LinearProgress } from '@mui/material';
import React, { FC, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Home = React.lazy(() => import('./pages/Home'));
const Assets = React.lazy(() => import('./pages/Assets'));

const App: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<LinearProgress color="inherit" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallets" element={<Assets />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
