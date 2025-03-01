import { useParams, useNavigate } from 'react-router-dom';
import Comment from '../components/Comment';
import { Container, Typography, Paper, LinearProgress, CircularProgress, TextField, Button } from '@mui/material';
import { Grid2 } from '@mui/material';
import { useState, useEffect } from 'react';
import { formatDate } from '../utils/dateUtils'; // Import formatDate
import { styled } from '@mui/material';
import { getCampaign, deleteCampaign } from '../services/api'; // Import the getCampaign and deleteCampaign functions
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY'); // Replace with your actual Stripe public key

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1), // Use theme spacing (1 = 8px by default)
}));

function CampaignDetails() {
  const { id } = useParams();
  // console.log(id);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [comments, setComments] = useState([]); // Add comments state
  const [newComment, setNewComment] = useState(''); // Add new comment state
  const [donationAmount, setDonationAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await getCampaign(id);
        setCampaign(data);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to fetch campaign');
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        // Assuming you have an API endpoint to fetch comments for a campaign
        const response = await fetch(`http://localhost:4000/api/campaign/${id}/comments`); // Replace with your backend URL
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setError(error.message || 'Failed to fetch comments');
      }
    };

    fetchCampaign();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      try {
        // Assuming you have an API endpoint to add a comment to a campaign
        const response = await fetch(`http://localhost:4000/api/campaign/${id}/comments`, { // Replace with your backend URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if authentication is required
          },
          body: JSON.stringify({ text: newComment }),
        });

        const data = await response.json();
        setComments(data); // Assuming the backend returns the updated list of comments
        setNewComment('');
      } catch (error) {
        setError(error.message || 'Failed to add comment');
      }
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await deleteCampaign(id, token);
      navigate('/'); // Redirect to home page after deletion
    } catch (error) {
      setError(error.message || 'Failed to delete campaign');
    }
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();

    try {
      const stripe = await stripePromise;

      const response = await fetch('http://localhost:4000/api/donate', { // Replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId: id,
          amount: donationAmount * 100, // Amount in cents
        }),
      });

      const data = await response.json();

      if (data.sessionId) {
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (result.error) {
          setError(result.error.message);
        }
      } else {
        setError('Failed to create Stripe session');
      }
    } catch (error) {
      setError(error.message || 'Donation failed');
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress /> // Display loading indicator
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

  if (!campaign) {
    return (
      <Container>
        <StyledTypography variant="h4" gutterBottom>
          Campaign not found
        </StyledTypography>
      </Container>
    );
  }

  // Mock funding progress
  const goal = parseFloat(campaign.goal);
  const currentFunding = Math.min(goal / 2, goal); // Mock current funding (50% of goal or less)
  const progress = (currentFunding / goal) * 100;

  return (
    <Container>
      <StyledTypography variant="h4" gutterBottom>
        {campaign.title}
      </StyledTypography>
      <Grid2 container spacing={2}> {/* Use Grid2 */}
        <Grid2 item xs={12} md={8}> {/* Use Grid2 */}
          <Paper elevation={3} style={{ padding: '16px' }}>
            <StyledTypography variant="body1">{campaign.description}</StyledTypography>
            <StyledTypography variant="subtitle1">Category: {campaign.category}</StyledTypography>
            <StyledTypography variant="subtitle1">Start Date: {formatDate(campaign.startDate)}</StyledTypography>
            <StyledTypography variant="subtitle1">End Date: {formatDate(campaign.endDate)}</StyledTypography>
            <StyledTypography variant="subtitle1">Goal: ${campaign.goal}</StyledTypography>
            <StyledTypography variant="subtitle1">Current Funding: ${currentFunding}</StyledTypography>
            <LinearProgress variant="determinate" value={progress} />
            <form onSubmit={handleDonationSubmit}>
              <TextField
                label="Donation Amount"
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <Button variant="contained" color="primary" type="submit">
                Donate
              </Button>
            </form>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete Campaign
            </Button>
          </Paper>
        </Grid2> {/* Use Grid2 */}
        <Grid2 item xs={12} md={4}> {/* Use Grid2 */}
          <StyledTypography variant="h6" gutterBottom>
            Comments
          </StyledTypography>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          <form onSubmit={handleCommentSubmit}>
            <TextField
              label="Add a comment"
              multiline
              rows={4}
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Grid2> {/* Use Grid2 */}
      </Grid2> {/* Use Grid2 */}
    </Container>
  );
}

export default CampaignDetails;