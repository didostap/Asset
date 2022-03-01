import { Theme, CSSObject } from '@mui/material';

type DrawerMixin = (args: {
  open: boolean;
  openWidth: string;
  closeWidth: string;
  theme: Theme;
}) => CSSObject;

const toggleMixin = (width: string, theme: Theme): CSSObject => ({
  width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
});

export const drawerMixin: DrawerMixin = ({
  open,
  theme,
  openWidth,
  closeWidth,
}) => {
  const width = open ? openWidth : closeWidth;
  return {
    ...toggleMixin(width, theme),
    '& .MuiDrawer-paper': toggleMixin(width, theme),
  };
};
