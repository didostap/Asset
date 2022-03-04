import React, { FC, memo } from 'react';
import { StyledTableRow, StyledTableCell } from './mixins';

interface Props {
  columns: {
    label: string;
    dataKey: string;
  }[];
}

const TableColumns: FC<Props> = ({ columns }) => (
  <StyledTableRow>
    {columns.map((column) => (
      <StyledTableCell key={column.dataKey}>{column.label}</StyledTableCell>
    ))}
  </StyledTableRow>
);

export default memo(TableColumns);
