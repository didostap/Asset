import { add } from 'date-fns';
import { Increases } from '../../entities/Asset';

type GetAssetNextUpdateDate = (
  increase: Increases,
  interval: number
) => Date | undefined;

// @ts-ignore: Unreachable code error
export const getAssetNextUpdateDate: GetAssetNextUpdateDate = (
  increase,
  interval
) => {
  switch (increase) {
    case Increases.DAILY:
      return add(new Date(), {
        days: interval,
      });
    case Increases.WEEKLY:
      return add(new Date(), {
        weeks: interval,
      });
    case Increases.MONTHLY:
      return add(new Date(), {
        months: interval,
      });
    case Increases.YEARLY:
      return add(new Date(), {
        years: interval,
      });
  }
};
