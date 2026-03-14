import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, IconButton, Typography } from '@mui/material';
import  { type ReactNode } from 'react';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const FONT_WEIGHT_BOLD = 700;
const INSTAGRAM_URL = 'https://instagram.com/[handle]';
const EMAIL = 'hello@krushna.art';

function ContactLink({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        textDecoration: 'none',
        color: 'text.primary',
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:hover': { color: 'primary.main' },
      }}
    >
      <IconButton component="span" sx={{ color: 'inherit', p: 0 }}>{icon}</IconButton>
      <Typography variant="h6" sx={{ fontFamily: FONT_DISPLAY }}>{label}</Typography>
    </Box>
  );
}

export function ContactPage() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4, maxWidth: 600 }}>
      <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY, fontWeight: FONT_WEIGHT_BOLD, mb: 8 }}>
        Get in touch
      </Typography>
      <ContactLink href={`mailto:${EMAIL}`} icon={<MailOutlineIcon />} label={EMAIL} />
      <ContactLink href={INSTAGRAM_URL} icon={<InstagramIcon />} label="Instagram" />
    </Box>
  );
}
