import React, { FC, memo } from 'react';
import { Clear, Remove } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import { Asset } from '../../../generated/graphql';
import { AssetColumn } from '../constants';
import { StyledTableRow, StyledTableCell } from './mixins';

interface IRows {
  style: any;
  index: number;
  data: {
    items: Asset[];
    columns: AssetColumn[];
    isItemLoaded: (index: number) => boolean;
  };
}

interface IRow {
  column: AssetColumn;
  item: Asset[keyof Asset];
}

const Row: FC<IRow> = memo(({ item, column }) => {
  switch (column.label) {
    case 'PERCENT':
      return item ? (
        <>{item}%</>
      ) : (
        <IconButton sx={{ marginLeft: '-5px' }} size="small">
          <Remove fontSize="small" />
        </IconButton>
      );
    case '':
      return (
        <IconButton sx={{ marginLeft: '2rem' }} size="small">
          <Clear fontSize="small" />
        </IconButton>
      );
    default:
      return <>{item}</>;
  }
});

const Rows: FC<IRows> = ({
  index,
  style,
  data: { items, columns, isItemLoaded },
}) => {
  const item = items[index];
  const even = !!(index % 2);

  return (
    <StyledTableRow
      even={even}
      sx={[{ ...style }, !isItemLoaded(index) && { justifyContent: 'center' }]}
    >
      {!isItemLoaded(index) ? (
        <CircularProgress color="inherit" />
      ) : (
        columns.map((column, colIndex) => (
          <StyledTableCell key={item.id + colIndex}>
            <Row column={column} item={item[column.dataKey]} />
          </StyledTableCell>
        ))
      )}
    </StyledTableRow>
  );
};

export default memo(Rows);
