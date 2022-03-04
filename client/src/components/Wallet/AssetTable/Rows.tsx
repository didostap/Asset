import React, { FC, memo } from 'react';
import { Clear, Remove } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Asset } from '../../../generated/graphql';
import { AssetColumn } from '../constants';
import { StyledTableRow, StyledTableCell } from './mixins';

interface IRows {
  index: number;
  style: any;
  data: {
    items: Asset[];
    columns: AssetColumn[];
  };
}

interface IRow {
  lastRow: boolean;
  column: AssetColumn;
  item: Asset[keyof Asset];
}

const Row: FC<IRow> = memo(({ item, column, lastRow }) => {
  if (column.dataKey === 'percent') {
    if (item) return <>{item}%</>;
    return (
      <IconButton sx={{ marginLeft: '-5px' }} size="small">
        <Remove fontSize="small" />
      </IconButton>
    );
  } else if (lastRow) {
    return (
      <IconButton sx={{ marginLeft: '2rem' }} size="small">
        <Clear fontSize="small" />
      </IconButton>
    );
  } else {
    return <>{item}</>;
  }
});

const Rows: FC<IRows> = ({ index, style, data: { items, columns } }) => {
  const item = items[index];
  const even = !!(index % 2);

  return (
    <StyledTableRow even={even} sx={{ ...style }}>
      {columns.map((column, colIndex) => (
        <StyledTableCell key={item.id + colIndex}>
          <Row
            column={column}
            item={item[column.dataKey]}
            lastRow={columns.length - 1 === colIndex}
          />
        </StyledTableCell>
      ))}
    </StyledTableRow>
  );
};

export default memo(Rows);
