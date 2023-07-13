import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { HealthCheckRating } from '../../types';

interface Props {
  setRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

interface RatingOption {
  value: HealthCheckRating;
  label: string;
}

console.log(Object.values(HealthCheckRating));

const ratingOptions: RatingOption[] = [];
void Object.values(HealthCheckRating).forEach((v) => {
  if (!isNaN(Number(v))) {
    ratingOptions.push({
      value: Number(v),
      label: v.toString(),
    });
  }
});

const HealthCheckFormAdd = ({ setRating }: Props) => {
  const onRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === 'number') {
      const value = event.target.value;
      const rating = Object.values(HealthCheckRating).find(
        (r) => Number(r) === value
      );
      console.log(rating);
      if (rating && typeof rating === 'number') {
        setRating(rating);
      }
    }
  };

  return (
    <div>
      <InputLabel>Health Rating</InputLabel>
      <Select
        className='RatingSelect'
        sx={{
          mb: '14px',
        }}
        label="Health Rating"
        fullWidth
        defaultValue={0}
        onChange={onRatingChange}>
        {ratingOptions.map((option) => (
          <MenuItem
            id={option.label}
            key={option.label}
            value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default HealthCheckFormAdd;
