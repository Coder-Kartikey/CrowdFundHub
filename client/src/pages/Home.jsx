import CampaignCard from '../components/CampaignCard';
import { Container, Typography, CircularProgress, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { mockCampaigns } from '../utils/mockData'; // Import mockCampaigns

function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      // Store mock campaigns in local storage (optional)
      localStorage.setItem('campaigns', JSON.stringify(mockCampaigns));

      // Retrieve mock campaigns from local storage
      const storedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || mockCampaigns;
      setCampaigns(storedCampaigns);
      setLoading(false); // Set loading to false after data is fetched
    }, 1000); // Simulate a 1-second delay
  }, []);

  return (
    <Container maxWidth={false}> {/* Set maxWidth to false */}
      {/* <Typography variant="h4" gutterBottom>
        Campaigns
      </Typography> */}
      {loading ? (
        <CircularProgress /> // Display loading indicator
      ) : (
        <Grid container spacing={3}> {/* Increased spacing */}
          {campaigns.map((campaign) => (
            <Grid item xs={12} sm={6} md={4} key={campaign.id}> {/* Removed lg prop */}
              <CampaignCard campaign={campaign} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Home;