import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem } from '@mui/material';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';

const Language = () => {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const setLanguage = (value: string) => () => {
    i18n.changeLanguage(value);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleClick}
        sx={{
          '&.MuiButtonBase-root:hover': {
            bgcolor: 'transparent',
          },
        }}
        endIcon={
          <ArrowBackIosNewOutlined
            sx={[
              {
                width: '13px',
                transform: 'rotate(90deg)',
                transition: (theme) =>
                  theme.transitions.create('all', {
                    duration: theme.transitions.duration.shortest,
                  }),
              },
              open && {
                transform: 'rotate(-90deg)',
              },
            ]}
          />
        }
      >
        {i18n.resolvedLanguage}
      </Button>
      <Menu
        open={open}
        id="language-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={setLanguage('ua')}>UA</MenuItem>
        <MenuItem onClick={setLanguage('en')}>EN</MenuItem>
      </Menu>
    </>
  );
};

export default Language;
