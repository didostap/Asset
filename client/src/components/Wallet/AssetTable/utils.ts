import moment from 'moment';
import { Asset } from '../../../generated/graphql';

export const loadData = Array.from({ length: 10 }, (_, i) => ({
  id: `${i}`,
  name: '',
  amount: 0,
  currency: '',
  percent: 0,
  increase: '',
  interval: 0,
  createdAt: '',
})) as Asset[];

export const convertData = (data: Asset[]): Asset[] =>
  data.map(({ createdAt, ...rest }) => ({
    ...rest,
    createdAt: moment(createdAt, 'x').format('MMM Do YYYY'),
  }));

export const itemKey = (index: number, data: { items: Asset[] }) =>
  data.items[index].id;
