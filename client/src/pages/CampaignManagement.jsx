import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  marginTop: '20px',
});

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease-in-out', // Add transition for hover effect
  '&:hover': {
    transform: 'scale(1.05)', // Add scale effect on hover
  },
});

const StyledCardMedia = styled(CardMedia)({
  height: '200px', // Fixed height for the image
  objectFit: 'cover', // Cover the entire area
});

function CampaignManagement() {
  const [campaigns, setCampaigns] = useState([]);
  const defaultImage = "https://media.istockphoto.com/id/1138904508/photo/happy-group-of-high-school-grads.webp?s=1024x1024&w=is&k=20&c=X3TcUmvqvYfVweRLEVOFitdPJ6NOEf-UxTiDqtgH974=";

  useEffect(() => {
    // Retrieve campaigns from local storage
    const storedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
    setCampaigns(storedCampaigns);
  }, []);

  const handleDeleteCampaign = (id) => {
    // Delete campaign from local storage
    const updatedCampaigns = campaigns.filter((campaign) => campaign.id !== id);
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
    setCampaigns(updatedCampaigns);
  };

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" gutterBottom>
        Campaign Management
      </Typography>
      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign.id}>
            <StyledCard>
            <StyledCardMedia
                component="img"
                image={campaign.imageVideoURL || defaultImage} // Use a placeholder image if no URL is provided
                alt={campaign.title}
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop
                  e.target.src = defaultImage; // Fallback image
                }}
            />
              <CardContent>
                <Typography variant="h6" component="div">
                  {campaign.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {campaign.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/campaign/${campaign.id}`}>
                  View
                </Button>
                <Button size="small" component={Link} to={`/edit-campaign/${campaign.id}`}>
                  Edit
                </Button>
                <Button size="small" onClick={() => handleDeleteCampaign(campaign.id)}>
                  Delete
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      {/* <StyledButton variant="contained" color="primary" component={Link} to="/create-campaign">
        Create New Campaign
      </StyledButton> */}
    </Container>
  );
}

export default CampaignManagement;