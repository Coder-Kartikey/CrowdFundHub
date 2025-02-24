import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Grid2 } from '@mui/material';
import CustomTextField from './CustomTextField'; // Import CustomTextField
import CustomSelectField from './CustomSelectField'; // Import CustomSelectField
import CustomDatePicker from './CustomDatePicker'; // Import CustomDatePicker
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const FormContainer = styled('form')(({ theme }) => ({
  backgroundColor: '#fff',
  color: theme.palette.text.primary,
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
  maxWidth: '400px',
  margin: '0 auto',
}));

const StyledGridItem = styled(Grid2)({
  justifyContent: 'flex-start', // Align items to the left
  display: 'flex',
});

function CreateCampaignForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageVideoURL, setImageVideoURL] = useState('');

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [goalError, setGoalError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState('');
  const [imageVideoURLError, setImageVideoURLError] = useState('');

  const [creationSuccess, setCreationSuccess] = useState(false);
  const [creationError, setCreationError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    // Title validation
    if (!title) {
      setTitleError('Title is required');
      isValid = false;
    } else {
      setTitleError('');
    }

    // Description validation
    if (!description) {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    // Goal validation
    if (!goal) {
      setGoalError('Goal is required');
      isValid = false;
    } else if (isNaN(goal) || parseFloat(goal) <= 0) {
      setGoalError('Goal must be a positive number');
      isValid = false;
    } else {
      setGoalError('');
    }

    // Category validation
    if (!category) {
      setCategoryError('Category is required');
      isValid = false;
    } else {
      setCategoryError('');
    }

    // Start Date validation
    if (!startDate) {
      setStartDateError('Start Date is required');
      isValid = false;
    } else {
      setStartDateError('');
    }

    // End Date validation
    if (!endDate) {
      setEndDateError('End Date is required');
      isValid = false;
    } else {
      setEndDateError('');
    }

    // Date validation (Start date must be before end date)
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      setEndDateError('End date must be after start date');
      isValid = false;
    } else {
      setEndDateError('');
    }

    // Image/Video URL validation
    if (!imageVideoURL) {
      setImageVideoURLError('Image/Video URL is required');
      isValid = false;
    } else if (!isValidUrl(imageVideoURL)) {
      setImageVideoURLError('Image/Video URL is invalid');
      isValid = false;
    } else {
      setImageVideoURLError('');
    }

    if (isValid) {
      // Mock API call - Store campaign data in local storage
      const newCampaign = {
        id: Date.now(), // Generate a unique ID
        title,
        description,
        goal,
        category,
        startDate,
        endDate,
        imageVideoURL,
        creator: localStorage.getItem('userEmail'), // Add creator email
      };

      // Get existing campaigns from local storage
      const storedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];

      // Add the new campaign to the array
      storedCampaigns.push(newCampaign);

      // Store the updated array in local storage
      localStorage.setItem('campaigns', JSON.stringify(storedCampaigns));

      console.log('Campaign created successfully:', newCampaign);

      // Reset the form and show success message
      setTitle('');
      setDescription('');
      setGoal('');
      setCategory('');
      setStartDate('');
      setEndDate('');
      setImageVideoURL('');

      setCreationSuccess(true);
      setCreationError('');

      // Redirect to the campaign management page
      navigate('/campaign-management');
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const categoryMenuItems = [
    { value: 'technology', label: 'Technology' },
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' },
    { value: 'charity', label: 'Charity' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Grid2 container spacing={2} direction="column">
        <Grid2 item>
          <Typography variant="h5">Create Campaign</Typography>
        </Grid2>
        <StyledGridItem item>
          <CustomTextField
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!titleError}
            helperText={titleError}
          />
        </StyledGridItem>
        <StyledGridItem item>
          <CustomTextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!descriptionError}
            helperText={descriptionError}
          />
        </StyledGridItem>
        <StyledGridItem item>
          <CustomTextField
            label="Goal"
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            error={!!goalError}
            helperText={goalError}
          />
        </StyledGridItem>
        <StyledGridItem item>
          <CustomSelectField
            labelId="category-label"
            id="category"
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            error={!!categoryError}
            helperText={categoryError}
            menuItems={categoryMenuItems}
          />
        </StyledGridItem>
        <StyledGridItem item>
          <CustomTextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            error={!!startDateError}
            helperText={startDateError}
          />
        </StyledGridItem>
        <StyledGridItem item>
          <CustomTextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            error={!!endDateError}
            helperText={endDateError}
          />
        </StyledGridItem>
        <StyledGridItem item>
          <CustomTextField
            label="Image/Video URL"
            type="text"
            value={imageVideoURL}
            onChange={(e) => setImageVideoURL(e.target.value)}
            error={!!imageVideoURLError}
            helperText={imageVideoURLError}
          />
        </StyledGridItem>
        <Grid2 item>
          <Button variant="contained" color="primary" type="submit">
            Create
          </Button>
        </Grid2>
        {creationSuccess && (
          <Grid2 item>
            <Alert severity="success">Campaign created successfully!</Alert>
          </Grid2>
        )}
        {creationError && (
          <Grid2 item>
            <Alert severity="error">{creationError}</Alert>
          </Grid2>
        )}
      </Grid2>
    </FormContainer>
  );
}

export default CreateCampaignForm;