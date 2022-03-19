export const __prod__ = process.env.NODE_ENV === 'production';

export const CLIENT_DEV_HOST = 'http://localhost:3000';
export const APOLLO_STUDIO = 'https://studio.apollographql.com';
export const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
export const COOKIE_NAME = 'asset_uid';

export const CURRENCIES = ['USD', 'EUR', 'UAH'];
export const INCREASES = ['', 'daily', 'weekly', 'monthly', 'yearly'] as const;
