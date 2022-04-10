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
  { i18key: 'home', Icon: GridViewOutlined, link: '/' },
  { i18key: 'echange', Icon: InsertChartOutlined, link: '/echange' },
  { i18key: 'prices', Icon: ArticleOutlined, link: '/' },
  { i18key: 'wallets', Icon: AccountBalanceWalletOutlined, link: '/wallets' },
  { i18key: 'promotions', Icon: ApiOutlined, link: '/' },
  { i18key: 'activities', Icon: TimelineOutlined, link: '/' },
  { i18key: 'notifications', Icon: NotificationsNoneOutlined, link: '/' },
  { i18key: 'settings', Icon: SettingsOutlined, link: '/' },
] as const;
