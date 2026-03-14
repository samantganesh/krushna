import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import  { type MouseEvent } from 'react';

import  { type ArtworkMedium } from './types';


const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const FONT_WEIGHT_SEMIBOLD = 600;

const MEDIUMS: Array<{ value: ArtworkMedium | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'painting', label: 'Painting' },
  { value: 'drawing', label: 'Drawing' },
  { value: 'film', label: 'Film' },
  { value: 'sculpture', label: 'Sculpture' },
  { value: 'performance', label: 'Performance' },
];

interface MediumFilterProps {
  value: ArtworkMedium | 'all';
  onChange: (value: ArtworkMedium | 'all') => void;
}

export function MediumFilter({ value, onChange }: MediumFilterProps) {
  const handleChange = (_: MouseEvent<HTMLElement>, next: string | null) => {
    if (next !== null) {
      onChange(next as ArtworkMedium | 'all');
    }
  };

  return (
    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 4 }}>
      <ToggleButtonGroup value={value} exclusive onChange={handleChange}>
        {MEDIUMS.map((m) => (
          <ToggleButton key={m.value} value={m.value} size="small">
            <Typography variant="caption" sx={{ fontFamily: FONT_DISPLAY, fontWeight: FONT_WEIGHT_SEMIBOLD }}>
              {m.label}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
