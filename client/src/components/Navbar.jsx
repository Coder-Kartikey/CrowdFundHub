import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import logo from '../assets/react.svg';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.main,
  backgroundColor: theme.palette.background.default,
  // color: theme.palette.primary.contrastText,
  color: theme.palette.text.primary,
  width: '98%', // Use percentage for width
  maxWidth: '1200px', // Add a maximum width
  borderRadius: '10px', // Add border radius
  marginTop: theme.spacing(2), // Add margin top
  // marginBottom: theme.spacing(2), // Add margin bottom
  marginLeft: 'auto', // Center horizontally
  marginRight: 'auto', // Center horizontally
  position: 'relative', // Ensure it sticks to the top
  top: 0, // Ensure it's at the very top
  zIndex: theme.zIndex.appBar, // Ensure it's above other content
  boxShadow: 'none', // Remove the shadow
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StyledMenuIcon = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2), // Use theme spacing
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textAlign: 'center',
  fontFamily: theme.typography.fontFamily, // Use the theme's font family
  fontWeight: 700, // Make the title bold
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2), // Use theme spacing
  '&:hover': {
    backgroundColor: theme.palette.secondary.main, // Change background color on hover
    color: theme.palette.primary.contrastText, // Change text color on hover
  },
}));

const StyledLogo = styled('img')({
  height: '40px',
  marginRight: '16px',
});

const OuterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#242424', // Match page background
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  // height: '85px',
  zIndex: theme.zIndex.appBar - 1, // Ensure it's behind the AppBar
  display: 'flex',
  justifyContent: 'center',
}));

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <OuterContainer>
      <StyledAppBar position="relative">
        <StyledToolbar>
          <StyledLogo src={logo} alt="Logo" />
          <StyledMenuIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </StyledMenuIcon>
          <StyledTypography variant="h6" component="div">
            CrowdFundHub
          </StyledTypography>
          <div>
            {isAuthenticated() ? (
              <>
                <StyledButton color="inherit" component={Link} to="/">
                  Home
                </StyledButton>
                {location.pathname !== '/campaign-management' ? (
                  <StyledButton color="inherit" component={Link} to="/campaign-management">
                    Manage Campaigns
                  </StyledButton>
                ) : (
                  <StyledButton color="inherit" component={Link} to="/create-campaign">
                    Create New Campaign
                  </StyledButton>
                )}
                <StyledButton color="inherit" onClick={handleLogout}>
                  Logout
                </StyledButton>
              </>
            ) : (
              <>
                <StyledButton color="inherit" component={Link} to="/login">
                  Login
                </StyledButton>
                <StyledButton color="inherit" component={Link} to="/register">
                  Register
                </StyledButton>
              </>
            )}
          </div>
        </StyledToolbar>
      </StyledAppBar>
    </OuterContainer>
  );
}

export default Navbar;