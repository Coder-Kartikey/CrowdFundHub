import CampaignCard from '../components/CampaignCard';
import { Container, Typography, CircularProgress, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { mockCampaigns } from '../utils/mockData'; // Import mockCampaigns

function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [page, setPage] = useState(1); // Current page number
  const campaignsPerPage = 6; // Number of campaigns to load per page
  const [hasMore, setHasMore] = useState(true); // Track if there are more campaigns to load

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      // Store mock campaigns in local storage (optional)
      localStorage.setItem('campaigns', JSON.stringify(mockCampaigns));

      // Retrieve mock campaigns from local storage
      const storedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || mockCampaigns;

      // Calculate the start and end index for the current page
      const startIndex = (page - 1) * campaignsPerPage;
      const endIndex = startIndex + campaignsPerPage;

      // Slice the campaigns array to get the campaigns for the current page
      const paginatedCampaigns = storedCampaigns.slice(startIndex, endIndex);

      // Check if there are more campaigns to load
      if (paginatedCampaigns.length === 0) {
        setHasMore(false);
      }

      setCampaigns((prevCampaigns) => {
        const newCampaigns = paginatedCampaigns.filter(
          (campaign) => !prevCampaigns.find((c) => c.id === campaign.id)
        );
        return [...prevCampaigns, ...newCampaigns];
      }); // Append new campaigns to existing campaigns
      setLoading(false); // Set loading to false after data is fetched
    }, 1000); // Simulate a 1-second delay
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
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

  return (
    <Container maxWidth={false}> {/* Set maxWidth to false */}
      {loading && page === 1 ? (
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
      {loading && page > 1 && <CircularProgress />}
    </Container>
  );
}

export default Home;