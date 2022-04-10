import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledTableRow, StyledTableCell } from './mixins';

interface Props {
  columns: {
    label: string;
    dataKey: string;
  }[];
}

const TableColumns: FC<Props> = ({ columns }) => {
  const { t } = useTranslation();

  return (
    <StyledTableRow>
      {columns.map((column) => (
        <StyledTableCell key={column.dataKey}>
          {t(column.label)}
        </StyledTableCell>
      ))}
    </StyledTableRow>
  );
};

export default memo(TableColumns);
