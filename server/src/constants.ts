export const __prod__ = process.env.NODE_ENV === 'production';

export const CLIENT_DEV_HOST = 'http://localhost:3000';

export const CURRENCIES = ['USD', 'EUR', 'UAH'];
export const INCREASES = ['', 'daily', 'weekly', 'monthly', 'yearly'] as const;
