// filepath: client/src/components/RegistrationForm.jsx
import { useState } from 'react';
import { TextField, Button, Grid2, Typography, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StyledTextField = styled(TextField)({
  marginBottom: '16px',
});

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

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
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      // Mock API call - Store user data in local storage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password);

      // Generate a mock token
      const mockToken = 'mockToken123';
      localStorage.setItem('token', mockToken);

      console.log('Registration successful. Mock token:', mockToken);

      // Reset the form and show success message
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRegistrationSuccess(true);
      setRegistrationError('');

      // Redirect to the login page
      navigate('/login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container spacing={2} direction="column" maxWidth="400px">
        <Grid2 item>
          <Typography variant="h5">Register</Typography>
        </Grid2>
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
          <StyledTextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
          />
        </Grid2>
        <Grid2 item>
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </Grid2>
        {registrationSuccess && (
          <Grid2 item>
            <Alert severity="success">Registration successful!</Alert>
          </Grid2>
        )}
        {registrationError && (
          <Grid2 item>
            <Alert severity="error">{registrationError}</Alert>
          </Grid2>
        )}
      </Grid2>
    </form>
  );
}

export default RegistrationForm;