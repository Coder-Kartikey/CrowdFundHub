import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CampaignDetails from './pages/CampaignDetails';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { isAuthenticated } from './utils/auth';
import CreateCampaignForm from './components/CreateCampaignForm';
import CampaignManagement from './pages/CampaignManagement';
import EditCampaignForm from './components/EditCampaignForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#ede7f6',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
  },
});

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const ContentContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8), // Adjust this value as needed (8 = 64px by default)
  minHeight: 'calc(100vh - 64px)', // Ensure content takes up at least the viewport height minus the Navbar height
  marginBottom: theme.spacing(8),
}));

function App() {
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate content loading (replace with your actual loading logic)
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after a delay
    }, 500); // Adjust the delay as needed
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <ContentContainer>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/campaign/:id"
              element={
                <PrivateRoute>
                  <CampaignDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-campaign"
              element={
                <PrivateRoute>
                  <CreateCampaignForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/campaign-management"
              element={
                <PrivateRoute>
                  <CampaignManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-campaign/:id"
              element={
                <PrivateRoute>
                  <EditCampaignForm />
                </PrivateRoute>
              }
            />
          </Routes>
        </ContentContainer>
        {!isLoading && <Footer />}
      </Router>
    </ThemeProvider>
  );
}

export default App;