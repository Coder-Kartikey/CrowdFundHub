import { Paper, Typography, styled } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

function Comment({ comment }) {
  return (
    <StyledPaper elevation={1}>
      <Typography variant="body2">{comment.text}</Typography>
    </StyledPaper>
  );
}

export default Comment;