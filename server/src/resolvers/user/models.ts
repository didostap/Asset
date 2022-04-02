import {
  Connection,
  EntityManager,
  IDatabaseDriver,
  wrap,
} from '@mikro-orm/core';
import { isToday } from 'date-fns';
import { forEach } from 'lodash';
import { Increases } from 'src/entities/Asset';
import { User } from 'src/entities/User';
import { getAssetNextUpdateDate } from '../asset/models';

type UpdateUserEntities = (args: {
  user: User;
  em: EntityManager<IDatabaseDriver<Connection>>;
}) => void;

export const updateUserEntities: UpdateUserEntities = async ({ user, em }) => {
  if (!user?.lastEntityUpdateDate) {
    wrap(user).assign({
      lastEntityUpdateDate: new Date(),
    });
    em.flush();
  } else {
    if (!isToday(user?.lastEntityUpdateDate)) {
      const assets = await user?.assets?.init();
      forEach(assets, (asset) => {
        if (isToday(asset.nextIncreaseDate as Date)) {
          const amount =
            asset.amount * ((asset.percent as number) / 100) + asset.amount;

          const nextIncreaseDate = getAssetNextUpdateDate(
            asset.increase as Increases,
            asset.interval as number
          );

          wrap(asset).assign({
            amount,
            nextIncreaseDate,
          });
        }
      });

      wrap(user).assign({
        lastEntityUpdateDate: new Date(),
      });

      em.flush();
    }
  }
};
