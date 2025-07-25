import { useState, useEffect } from 'react'
import {
  useNavigate
} from 'react-router-dom'
import {
  Box,
  Container,
  TextField,
  Button,
  Typography
} from '@mui/material'
import { login } from '../services/authService'
import { useAuthStore } from '../stores/authStore'

function LoginPage() {
  const navigate = useNavigate()
  const { user, setAuth } = useAuthStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      navigate('/') // or '/dashboard'
    }
  }, [user, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginRes = await login(username, password);
      const { accessToken, user }  = loginRes.data;
      setAuth(accessToken, user);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check credentials.');
    }
  }

  return (
    <Container sx={{ mt: 10 }}>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 8,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Season Vibe Login
        </Typography>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
          Login
        </Button>

      </Box>
    </Container>
  )
}

export default LoginPage
