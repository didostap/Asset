import React, { FC } from 'react';
import {
  Drawer as MuiDrawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
  Theme,
  Toolbar,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useToggle from '../../customHooks/useToggle';
import { drawerMixin } from '../../utils/drawerMixin';
import { menuItems } from './constants';
import { useTranslation } from 'react-i18next';

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  whiteSpace: 'nowrap',
  ...drawerMixin({
    open: open!,
    openWidth: '13rem',
    closeWidth: '4rem',
    theme: theme as Theme,
  }),
}));

const Menu: FC = () => {
  const { t } = useTranslation();
  const [openMenu, toggleMenu] = useToggle(true);

  return (
    <Drawer variant="permanent" open={openMenu}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={toggleMenu}>
          {openMenu ? (
            <KeyboardDoubleArrowLeft />
          ) : (
            <KeyboardDoubleArrowRight />
          )}
        </IconButton>
      </Toolbar>
      <List component="nav">
        {menuItems.map(({ i18key, Icon, link }, i) => (
          <ListItem button key={i} to={link} component={Link}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={t(i18key)} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Menu;
