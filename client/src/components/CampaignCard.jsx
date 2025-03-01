import { Card, CardContent, CardActions, Typography, Button, CardMedia, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { formatDate } from '../utils/dateUtils';

const StyledCard = styled(Card)({
  height: '100%', // Ensure all cards have the same height
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

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const StyledDescription = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3, // Limit to 3 lines
  WebkitBoxOrient: 'vertical',
});

function CampaignCard({ campaign }) {
  const defaultImage = "https://media.istockphoto.com/id/1138904508/photo/happy-group-of-high-school-grads.webp?s=1024x1024&w=is&k=20&c=X3TcUmvqvYfVweRLEVOFitdPJ6NOEf-UxTiDqtgH974=";
  return (
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
      <StyledCardContent>
        <Typography variant="h6" component="div">
          {campaign.title}
        </Typography>
        <StyledDescription variant="body2" color="text.secondary">
          {campaign.description}
        </StyledDescription>
        <Typography variant="caption" display="block"> {/* Display dates */}
          Start Date: {formatDate(campaign.startDate)}
        </Typography>
        <Typography variant="caption" display="block">
          End Date: {formatDate(campaign.endDate)}
        </Typography>
      </StyledCardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/campaign/${campaign._id}`}>
          Learn More
        </Button>
      </CardActions>
    </StyledCard>
  );
}

export default CampaignCard;