import { BrowserRouter } from 'react-router-dom'
import {
  ThemeProvider,
  CssBaseline
} from '@mui/material'
import AppRoutes from './routes/AppRoutes'
import theme from './theme'
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { refreshAccessToken, logout } from './services/authService';

function App() {
  // useEffect(() => {
  //   if (!useAuthStore.getState().accessToken) {
  //     refreshAccessToken().catch(() => {
  //       logout(); // optional: clear state if refresh fails
  //     });
  //   }
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
