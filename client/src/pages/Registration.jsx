// filepath: client/src/pages/Registration.jsx
import RegistrationForm from '../components/RegistrationForm';
import { Container } from '@mui/material';
import { useState } from 'react';

function Registration() {
  return (
    <Container maxWidth="sm" className="form-container">
      <h1>Registration Page</h1>
      <RegistrationForm />
    </Container>
  );
}

export default Registration;