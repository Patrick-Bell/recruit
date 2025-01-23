import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import the eye icons
import Logo from '../images/new-logo.png'; // Importing the logo
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State to control visibility
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useAuth()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await login(email, password)
    }catch(e) {
      console.log(e)
    }
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh', backgroundColor: '#f4f4f4', margin: 0 }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Paper
          elevation={4}
          style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '10px',
            backgroundColor: 'white',
          }}
        >
          {/* Logo */}
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: '80%',
              maxWidth: '250px', // Adjust logo size
              marginBottom: '20px', // Add some space below the logo
              borderRadius: '10px',
            }}
          />

          <Typography variant="h5" gutterBottom align="center">
            Login
          </Typography>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              label="Password"
              type={passwordVisible ? 'text' : 'password'} // Toggle input type based on state
              fullWidth
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {passwordVisible ? <VisibilityOff /> : <Visibility />} {/* Toggle eye icon */}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '16px' }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
