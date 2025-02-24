import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';

const StyledDatePicker = styled(DatePicker)({
  width: '100%',
  '& .MuiInputBase-root': {
    '& input': {
      padding: '10px 12px',
      '&::placeholder': {
        opacity: 1, // Ensure placeholder is always visible
        color: 'rgba(0, 0, 0, 0.6)', // Adjust placeholder color
      },
    },
  },
});

function CustomDatePicker({ label, value, onChange, error, helperText }) {
  return (
    <StyledDatePicker
      label={label}
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
}

export default CustomDatePicker;