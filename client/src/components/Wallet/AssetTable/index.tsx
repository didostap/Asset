import React, { FC, memo } from 'react';
import { Table, TableHead, TableBody } from '@mui/material';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { Asset, useAssetsQuery } from '../../../generated/graphql';
import TableColumns from './TableColumns';
import { ASSET_COLUMNS } from '../constants';
import { convertData, itemKey, loadData } from './utils';
import Rows from './Rows';

const AssetsTable: FC = () => {
  const { data, loading } = useAssetsQuery();

  const tableData = React.useMemo(
    () => ({
      columns: ASSET_COLUMNS,
      items: loading ? loadData : convertData(data!.assets as Asset[]),
    }),
    [loading, data]
  );

  return (
    <Table component="div" sx={{ height: '80vh', width: '100%' }}>
      <TableHead component="div">
        <TableColumns columns={ASSET_COLUMNS} />
      </TableHead>

      <TableBody component="div">
        <AutoSizer>
          {({ height, width }) => (
            <List
              itemSize={80}
              width={width}
              height={height}
              itemKey={itemKey}
              itemData={tableData}
              itemCount={tableData.items.length}
            >
              {Rows}
            </List>
          )}
        </AutoSizer>
      </TableBody>
    </Table>
  );
};

export default memo(AssetsTable);
