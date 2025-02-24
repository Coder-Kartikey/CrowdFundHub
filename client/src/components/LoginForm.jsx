// filepath: client/src/components/LoginForm.jsx
import { useState } from 'react';
import { TextField, Button, Grid2, Typography, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StyledTextField = styled(TextField)({
  marginBottom: '16px',
});

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      // Mock API call - Retrieve user data from local storage
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');

      if (email === storedEmail && password === storedPassword) {
        // Generate a mock token
        const mockToken = 'mockToken123';
        localStorage.setItem('token', mockToken);

        console.log('Login successful. Mock token:', mockToken);

        // Reset the form and show success message
        setEmail('');
        setPassword('');
        setLoginSuccess(true);
        setLoginError('');

        // Redirect to the home page
        navigate('/');
      } else {
        setLoginError('Invalid credentials');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container spacing={2} direction="column" maxWidth="400px">
        {/* <Grid2 item>
          <Typography variant="h5">Login</Typography>
        </Grid2> */}
        <Grid2 item>
          <StyledTextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
        </Grid2>
        <Grid2 item>
          <StyledTextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
        </Grid2>
        <Grid2 item>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Grid2>
        {loginSuccess && (
          <Grid2 item>
            <Alert severity="success">Login successful!</Alert>
          </Grid2>
        )}
        {loginError && (
          <Grid2 item>
            <Alert severity="error">{loginError}</Alert>
          </Grid2>
        )}
      </Grid2>
    </form>
  );
}

export default LoginForm;