import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './services/i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, LinearProgress } from '@mui/material';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from './utils/cache';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    background: {
      default: 'rgba(228, 228, 228, 0.3)',
    },
  },
});

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000',
  credentials: 'include',
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback={<LinearProgress color="inherit" />}>
              <App />
            </Suspense>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
