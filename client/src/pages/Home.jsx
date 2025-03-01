import CampaignCard from '../components/CampaignCard';
import { Container, Typography, CircularProgress, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { getCampaigns } from '../services/api'; // Import the getCampaigns function

function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const fetchCampaigns = async () => {
    //   try {
    //     const data = await getCampaigns();
    //     setCampaigns(data);
    //     setLoading(false);
    //   } catch (error) {
    //     setError(error.message || 'Failed to fetch campaigns');
    //     setLoading(false);
    //   }
    // };

    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/campaign/all'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        // Log the raw response if available
        if (error.response) {
          try {
            const text = await error.response.text();
            console.error("Raw response:", text);
          } catch (textError) {
            console.error("Error getting raw response:", textError);
          }
        }
        setError(error.message || 'Failed to fetch campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign.id}>
            <CampaignCard campaign={campaign} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
{/* <h1>Hello World</h1> */}
}

export default Home;