import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';

const Home = React.lazy(() => import('./pages/Home'));
const Assets = React.lazy(() => import('./pages/Assets'));

const App: FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wallets" element={<Assets />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
