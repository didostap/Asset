import { Asset } from '../../generated/graphql';

export const textFieldProps = {
  fullWidth: true,
  size: 'small',
  margin: 'dense',
} as const;

export const currencies = ['USD', 'EUR', 'UAH'] as const;

export const increases = [
  'none',
  'daily',
  'weekly',
  'monthly',
  'yearly',
] as const;

export interface AssetColumn {
  label: string;
  dataKey: keyof Asset;
}

export const ASSET_COLUMNS = [
  {
    label: 'asset',
    dataKey: 'name',
  },
  {
    label: 'amount',
    dataKey: 'amount',
  },
  {
    label: 'currency',
    dataKey: 'currency',
  },
  {
    label: 'percent',
    dataKey: 'percent',
  },
  {
    label: 'created_at',
    dataKey: 'createdAt',
  },
  {
    label: '',
    dataKey: 'delete',
  },
] as AssetColumn[];
