import { AppBar, Toolbar, Typography, styled, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material'; // Import Container

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  top: 'auto',
  bottom: 0,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  width: '100%',
  borderRadius: '10px', // Add border radius
  marginTop: theme.spacing(2), // Add margin top
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  marginRight: '16px',
});

function Footer() {
  return (
    <StyledAppBar position="static">
      <Container maxWidth={false} disableGutters> {/* Use Container with maxWidth={false} and disableGutters */}
        <StyledToolbar>
          <div>
            <StyledLink to="/about">About Us</StyledLink>
            <StyledLink to="/contact">Contact Us</StyledLink>
            <StyledLink to="/privacy">Privacy Policy</StyledLink>
          </div>
          <div>
            <IconButton color="inherit" aria-label="facebook">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" aria-label="twitter">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" aria-label="instagram">
              <Instagram />
            </IconButton>
          </div>
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} Campaign App. All rights reserved.
          </Typography>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
}

export default Footer;