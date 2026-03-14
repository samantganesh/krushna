import { AccountCircle } from '@mui/icons-material';
import { IconButton, Menu } from '@mui/material';
import React, { useState } from 'react';

export interface ProfileMenuProps {
  /**
   * Custom content to render inside the profile menu dropdown
   */
  children?: React.ReactNode;
  /**
   * Optional custom trigger element. If not provided, defaults to avatar icon.
   */
  trigger?: React.ReactNode;
}

interface DefaultTriggerProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
}

function DefaultTrigger({ onClick, open }: DefaultTriggerProps) {
  return (
    <IconButton
      onClick={onClick}
      size="large"
      edge="end"
      aria-label="profile menu"
      aria-controls={open ? 'profile-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      sx={{ color: 'inherit' }}
    >
      <AccountCircle />
    </IconButton>
  );
}

/**
 * ProfileMenu component provides a dropdown menu triggered by an avatar icon.
 * Content is completely slot-based via children prop.
 */
export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  children,
  trigger,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {trigger ? (
        <div onClick={handleClick}>{trigger}</div>
      ) : (
        <DefaultTrigger onClick={handleClick} open={open} />
      )}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
            },
          },
        }}
      >
        {children}
      </Menu>
    </>
  );
};
