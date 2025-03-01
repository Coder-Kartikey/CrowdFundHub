import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { getCampaign, updateCampaign } from '../services/api'; // Import the getCampaign and updateCampaign functions

const EditCampaignForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await getCampaign(id);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setGoal(data.goal);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to fetch campaign');
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const campaignData = {
        title,
        description,
        category,
        startDate,
        endDate,
        goal,
      };
      await updateCampaign(id, campaignData, token);
      navigate(`/campaign/${id}`); // Redirect to the campaign details page
    } catch (error) {
      setError(error.message || 'Failed to update campaign');
    }
  };

  if (loading) {
    return (
      <Grid container justifyContent="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Edit Campaign
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Goal"
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Update
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditCampaignForm;