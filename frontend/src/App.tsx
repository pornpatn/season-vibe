import { BrowserRouter } from 'react-router-dom'
import {
  ThemeProvider,
  CssBaseline
} from '@mui/material'
import AppRoutes from './routes/AppRoutes'
import AppInitializer from './components/AppInitializer.tsx'
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppInitializer>
          <AppRoutes />
        </AppInitializer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
