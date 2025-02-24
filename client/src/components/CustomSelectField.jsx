import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)({
  marginBottom: '16px',
  width: '100%',
});

function CustomSelectField({ labelId, id, label, value, onChange, error, helperText, menuItems }) {
  return (
    <StyledFormControl error={error} fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </StyledFormControl>
  );
}

export default CustomSelectField;