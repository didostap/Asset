import React, { FC, memo, useCallback, useMemo } from 'react';
import { Table, TableHead, TableBody } from '@mui/material';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import faker from '@faker-js/faker';
import TableColumns from './TableColumns';
import { ASSET_COLUMNS } from '../constants';
import { convertAssets } from './utils';
import Rows from './Rows';
import useAssets from './useAssets';

const AssetsTable: FC = () => {
  const { assets, hasNextPage, loadMoreAssets } = useAssets();
  const assetsCount = hasNextPage ? assets.length + 1 : assets.length;
  const isAssetLoaded = useCallback(
    (index: number) => !hasNextPage || index < assets.length,
    [assets.length, hasNextPage]
  );
  const itemData = useMemo(
    () => ({
      columns: ASSET_COLUMNS,
      items: convertAssets(assets),
      isItemLoaded: isAssetLoaded,
    }),
    [assets, isAssetLoaded]
  );

  return (
    <Table component="div" sx={{ height: '75vh', width: '100%' }}>
      <TableHead component="div">
        <TableColumns columns={ASSET_COLUMNS} />
      </TableHead>

      <TableBody component="div">
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              itemCount={assetsCount}
              isItemLoaded={isAssetLoaded}
              loadMoreItems={loadMoreAssets}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  ref={ref}
                  width={width}
                  height={height}
                  itemSize={80}
                  itemKey={faker.datatype.uuid}
                  itemData={itemData}
                  itemCount={assetsCount}
                  onItemsRendered={onItemsRendered}
                >
                  {Rows}
                </List>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </TableBody>
    </Table>
  );
};

export default memo(AssetsTable);
