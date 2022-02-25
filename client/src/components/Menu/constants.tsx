import {
  GridViewOutlined,
  InsertChartOutlined,
  ArticleOutlined,
  AccountBalanceWalletOutlined,
  ApiOutlined,
  TimelineOutlined,
  NotificationsNoneOutlined,
  SettingsOutlined,
} from '@mui/icons-material';

export const menuItems = [
  { text: 'Home', Icon: GridViewOutlined, link: '/' },
  { text: 'Echange', Icon: InsertChartOutlined, link: '/echange' },
  { text: 'Prices', Icon: ArticleOutlined, link: '/' },
  { text: 'Wallets', Icon: AccountBalanceWalletOutlined, link: '/wallets' },
  { text: 'Promotions', Icon: ApiOutlined, link: '/' },
  { text: 'Activities', Icon: TimelineOutlined, link: '/' },
  { text: 'Notifications', Icon: NotificationsNoneOutlined, link: '/' },
  { text: 'Settings', Icon: SettingsOutlined, link: '/' },
] as const;
