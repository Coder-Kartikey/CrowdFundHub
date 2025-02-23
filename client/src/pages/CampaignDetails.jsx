import { useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import { Container, Typography, Paper, LinearProgress, CircularProgress, TextField, Button } from '@mui/material';
import { Grid2 } from '@mui/material';
import { useState, useEffect } from 'react';
import { formatDate } from '../utils/dateUtils'; // Import formatDate
import { styled } from '@mui/material';

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1), // Use theme spacing (1 = 8px by default)
}));

function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [comments, setComments] = useState([]); // Add comments state
  const [newComment, setNewComment] = useState(''); // Add new comment state

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      // Retrieve mock campaigns from local storage
      const storedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];

      // Find the campaign with the matching ID
      const foundCampaign = storedCampaigns.find((campaign) => campaign.id === parseInt(id));

      setCampaign(foundCampaign);
      setLoading(false); // Set loading to false after data is fetched

      // Retrieve comments from local storage (or initialize an empty array)
      const storedComments = JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
      setComments(storedComments);
    }, 1000); // Simulate a 1-second delay
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const newCommentObject = {
        id: Date.now(),
        text: newComment,
      };
      const updatedComments = [...comments, newCommentObject];
      setComments(updatedComments);
      setNewComment('');

      // Store the updated comments in local storage
      localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress /> // Display loading indicator
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