// filepath: client/src/pages/Login.jsx
import LoginForm from '../components/LoginForm';
import { Container } from '@mui/material';

function Login() {
  return (
    <Container maxWidth="sm" className="form-container">
      <h1>Login Page</h1>
      <LoginForm />
    </Container>
  );
}

export default Login;