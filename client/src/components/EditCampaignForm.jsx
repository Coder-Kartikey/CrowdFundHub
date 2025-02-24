import { useState, useEffect } from 'react';
import { Button, Typography, Alert, TextField } from '@mui/material';
import { Grid2 } from '@mui/material';
import CustomTextField from './CustomTextField';
import CustomSelectField from './CustomSelectField';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';

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

function EditCampaignForm() {
  const { id } = useParams();
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

  const [editSuccess, setEditSuccess] = useState(false);
  const [editError, setEditError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve campaign data from local storage
    const storedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];

    // Find the campaign with the matching ID
    const campaignToEdit = storedCampaigns.find((campaign) => campaign.id === parseInt(id));

    if (campaignToEdit) {
      setTitle(campaignToEdit.title);
      setDescription(campaignToEdit.description);
      setGoal(campaignToEdit.goal);
      setCategory(campaignToEdit.category);
      setStartDate(campaignToEdit.startDate);
      setEndDate(campaignToEdit.endDate);
      setImageVideoURL(campaignToEdit.imageVideoURL);
    } else {
      // Handle campaign not found
      setEditError('Campaign not found');
    }
  }, [id]);

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
      // Mock API call - Update campaign data in local storage
      const updatedCampaign = {
        id: parseInt(id),
        title,
        description,
        goal,
        category,
        startDate,
        endDate,
        imageVideoURL,
      };

      // Get existing campaigns from local storage
      const storedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];

      // Find the index of the campaign to update
      const campaignIndex = storedCampaigns.findIndex((campaign) => campaign.id === parseInt(id));

      if (campaignIndex !== -1) {
        // Update the campaign in the array
        storedCampaigns[campaignIndex] = updatedCampaign;

        // Store the updated array in local storage
        localStorage.setItem('campaigns', JSON.stringify(storedCampaigns));

        console.log('Campaign updated successfully:', updatedCampaign);

        // Reset the form and show success message
        setEditSuccess(true);
        setEditError('');

        // Redirect to the campaign management page
        navigate('/campaign-management');
      } else {
        setEditError('Campaign not found');
      }
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
          <Typography variant="h5">Edit Campaign</Typography>
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
            rows={2}
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
            Update
          </Button>
        </Grid2>
        {editSuccess && (
          <Grid2 item>
            <Alert severity="success">Campaign updated successfully!</Alert>
          </Grid2>
        )}
        {editError && (
          <Grid2 item>
            <Alert severity="error">{editError}</Alert>
          </Grid2>
        )}
      </Grid2>
    </FormContainer>
  );
}

export default EditCampaignForm;