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
