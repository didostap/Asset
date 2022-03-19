import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
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
            <App />
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
