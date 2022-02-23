import React, { FC, useState, useCallback } from 'react';
import {
  Drawer as MuiDrawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
  Theme,
  Toolbar,
  CSSObject,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  GridViewOutlined,
  InsertChartOutlined,
  ArticleOutlined,
  AccountBalanceWalletOutlined,
  ApiOutlined,
  TimelineOutlined,
  NotificationsNoneOutlined,
  SettingsOutlined,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const menuItems = [
  { text: 'Home', Icon: GridViewOutlined, link: '/' },
  { text: 'Echange', Icon: InsertChartOutlined, link: '/echange' },
  { text: 'Prices', Icon: ArticleOutlined, link: '/' },
  { text: 'Wallets', Icon: AccountBalanceWalletOutlined, link: '/wallets' },
  { text: 'Promotions', Icon: ApiOutlined, link: '/' },
  { text: 'Activities', Icon: TimelineOutlined, link: '/' },
  { text: 'Notifications', Icon: NotificationsNoneOutlined, link: '/' },
  { text: 'Settings', Icon: SettingsOutlined, link: '/' },
] as const;

const openedMixin = (theme: Theme): CSSObject => ({
  width: '13rem',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: '4rem',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  ...(open && {
    ...openedMixin(theme as Theme),
    '& .MuiDrawer-paper': openedMixin(theme as Theme),
  }),
  ...(!open && {
    ...closedMixin(theme as Theme),
    '& .MuiDrawer-paper': closedMixin(theme as Theme),
  }),
}));

const Menu: FC = () => {
  const [isOpen, setOpen] = useState(true);
  const toggleMenu = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, [setOpen]);

  return (
    <Drawer variant="permanent" open={isOpen}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={toggleMenu}>
          {isOpen ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
        </IconButton>
      </Toolbar>
      <List component="nav">
        {menuItems.map(({ text, Icon, link }, i) => (
          <ListItem button key={i} to={link} component={Link}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Menu;
