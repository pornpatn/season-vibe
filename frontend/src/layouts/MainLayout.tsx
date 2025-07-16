import React, { useState } from 'react'
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
  ListItemButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { logout } from '../services/authService'

const drawerWidth = 240

interface MainLayoutProps {
  children: React.ReactNode
  pageTitle?: React.ReactNode
  actions?: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, pageTitle, actions }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, clearAuth } = useAuthStore()
  const [error, setError] = useState('')

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = async () => {
    try {
      await logout();
      clearAuth();
      navigate('/login');
    } catch (err) {
      setError('Login failed. Please check credentials.');
    }
  }

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Inventory', path: '/inventory' },
    { text: 'Ordering', path: '/ordering' },
    { text: 'Sales', path: '/sales' },
    { text: 'Users', path: '/users' },
  ]

  console.log('user: ', user);
  
  const drawer = (
    <Box onClick={isMobile ? handleDrawerToggle : undefined} sx={{ width: drawerWidth }}>
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Season-Vibe</Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        {user && (
          <>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Logged in as: {user.name}
            </Typography>
            <Button variant="outlined" fullWidth onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', p: 0, height: '100vh', width: '100vw' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {pageTitle || 'Season-Vibe'}
          </Typography>
          {actions}
        </Toolbar>
      </AppBar>

      {isMobile ? (
        <SwipeableDrawer
          variant="temporary"
          open={mobileOpen}
          onOpen={handleDrawerToggle}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          {drawer}
        </SwipeableDrawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          {drawer}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          // width: { md: `calc(100% - ${drawerWidth}px)` },
          // width: {
          //   md: `calc(100% - ${drawerWidth}px)`,
          //   lg: `calc(100%)px`
          // },
        }}>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  )
}

export default MainLayout
