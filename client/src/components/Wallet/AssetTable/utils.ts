import moment from 'moment';
import { Asset } from '../../../generated/graphql';

export const convertAssets = (data: Asset[]): Asset[] =>
  data.map(({ createdAt, ...rest }) => ({
    ...rest,
    createdAt: moment(createdAt, 'x').format('MMM Do YYYY'),
  }));
