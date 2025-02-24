import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, CardMedia, CircularProgress } from '@mui/material';
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
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const campaignsPerPage = 6;
  const [hasMore, setHasMore] = useState(true);
  const defaultImage = "https://media.istockphoto.com/id/1138904508/photo/happy-group-of-high-school-grads.webp?s=1024x1024&w=is&k=20&c=X3TcUmvqvYfVweRLEVOFitdPJ6NOEf-UxTiDqtgH974=";

  useEffect(() => {
    // Retrieve campaigns from local storage
    const storedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];

    // Get the logged-in user's email
    const userEmail = localStorage.getItem('userEmail');

    // Filter campaigns to only show those created by the logged-in user
    const userCampaigns = storedCampaigns.filter((campaign) => campaign.creator === userEmail);

    // Calculate the start and end index for the current page
    const startIndex = (page - 1) * campaignsPerPage;
    const endIndex = startIndex + campaignsPerPage;

    // Slice the campaigns array to get the campaigns for the current page
    const paginatedCampaigns = userCampaigns.slice(startIndex, endIndex);

    // Check if there are more campaigns to load
    if (paginatedCampaigns.length === 0) {
      setHasMore(false);
    }

    setCampaigns((prevCampaigns) => {
      const newCampaigns = paginatedCampaigns.filter(
        (campaign) => !prevCampaigns.find((c) => c.id === campaign.id)
      );
      return [...prevCampaigns, ...newCampaigns];
    });
    setLoading(false);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page and if there are more campaigns to load
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
        hasMore &&
        !loading
      ) {
        // Load the next page of campaigns
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loading]);

  const handleDeleteCampaign = (id) => {
    // Delete campaign from local storage
    const updatedCampaigns = campaigns.filter((campaign) => campaign.id !== id);
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
    setCampaigns(updatedCampaigns);
  };

  return (
    <Container maxWidth={false}>
      {/* <Typography variant="h4" gutterBottom>
        Campaign Management
      </Typography> */}
      <Grid container spacing={3}>
        {loading && page === 1 ? (
          <CircularProgress />
        ) : (
          campaigns.map((campaign) => (
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
          ))
        )}
        {loading && page > 1 && <CircularProgress />}
      </Grid>
      {/* <StyledButton variant="contained" color="primary" component={Link} to="/create-campaign">
        Create New Campaign
      </StyledButton> */}
    </Container>
  );
}

export default CampaignManagement;