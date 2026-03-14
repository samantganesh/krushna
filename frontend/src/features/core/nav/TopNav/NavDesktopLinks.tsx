import { Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { FONT_DISPLAY } from '../constants';
import type { NavItem } from '../types';

interface NavDesktopLinksProps {
  items: NavItem[];
}

export function NavDesktopLinks({ items }: NavDesktopLinksProps) {
  const { pathname } = useLocation();

  return (
    <>
      {items.map((item) => {
        const isActive = pathname === item.to;
        return (
          <Button
            key={item.to}
            component={Link}
            to={item.to}
            sx={{
              color: 'text.primary',
              fontFamily: FONT_DISPLAY,
              fontWeight: isActive ? 700 : 400,
              borderBottom: '2px solid',
              borderColor: isActive ? 'primary.main' : 'transparent',
              borderRadius: 0,
              px: 1,
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </>
  );
}
