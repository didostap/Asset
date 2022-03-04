import { Asset } from '../../generated/graphql';

export const textFieldProps = {
  fullWidth: true,
  size: 'small',
  margin: 'dense',
} as const;

export const currencies = ['USD', 'EUR', 'UAH'] as const;

export const increases = [
  {
    label: 'None',
    value: 'none',
  },
  {
    label: 'Daily',
    value: 'daily',
  },
  {
    label: 'Weekly',
    value: 'weekly',
  },
  {
    label: 'Monthly',
    value: 'monthly',
  },
  {
    label: 'Yearly',
    value: 'yearly',
  },
] as const;

export interface AssetColumn {
  label: string;
  dataKey: keyof Asset;
}

export const ASSET_COLUMNS = [
  {
    label: 'ASSET',
    dataKey: 'name',
  },
  {
    label: 'AMOUNT',
    dataKey: 'amount',
  },
  {
    label: 'CURRENCY',
    dataKey: 'currency',
  },
  {
    label: 'PERCENT',
    dataKey: 'percent',
  },
  {
    label: 'CREATED',
    dataKey: 'createdAt',
  },
  {
    label: '',
    dataKey: 'delete',
  },
] as AssetColumn[];
