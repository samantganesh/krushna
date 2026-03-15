import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { type MouseEvent, useState } from 'react';

import { LayoutA } from './LayoutA';
import { LayoutB } from './LayoutB';
import { LayoutC } from './LayoutC';
import { PAINTINGS } from './paintings';
import { type LayoutVariant } from './types';
import { useInfiniteScroll } from './useInfiniteScroll';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const SENTINEL_HEIGHT = 120;

const VARIANT_LABELS: Record<LayoutVariant, string> = {
  A: 'Caption below',
  B: 'Overlay',
  C: 'Side by side',
};

interface VariantPickerProps {
  variant: LayoutVariant;
  onChange: (v: LayoutVariant) => void;
}

function VariantPicker({ variant, onChange }: VariantPickerProps) {
  const handleChange = (
    _event: MouseEvent<HTMLElement>,
    next: LayoutVariant | null,
  ) => {
    if (next !== null) onChange(next);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="caption"
        sx={{ display: 'block', mb: 1, color: 'text.secondary' }}
      >
        Preview layout styles — pick one to keep
      </Typography>
      <ToggleButtonGroup
        value={variant}
        exclusive
        onChange={handleChange}
        size="small"
      >
        {(Object.keys(VARIANT_LABELS) as LayoutVariant[]).map((v) => (
          <ToggleButton key={v} value={v}>
            {VARIANT_LABELS[v]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}

export function PaintingsPage() {
  const [variant, setVariant] = useState<LayoutVariant>('A');
  const { visibleCount, sentinelRef } = useInfiniteScroll(PAINTINGS.length);

  const visible = PAINTINGS.slice(0, visibleCount);

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ px: { xs: 2, md: 8 }, mb: 4 }}>
        <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY, mb: 3 }}>
          Paintings
        </Typography>
        <VariantPicker variant={variant} onChange={setVariant} />
      </Box>

      {variant === 'A' && <LayoutA paintings={visible} />}
      {variant === 'B' && <LayoutB paintings={visible} />}
      {variant === 'C' && <LayoutC paintings={visible} />}

      {visibleCount < PAINTINGS.length && (
        <Box ref={sentinelRef} sx={{ height: SENTINEL_HEIGHT }} aria-hidden="true" />
      )}
    </Box>
  );
}
