import React, { FC } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  tableCellClasses,
} from '@mui/material';
import { styled } from '@mui/system';
import { useAssetsQuery } from '../../generated/graphql';

const loadData = Array.from({ length: 10 }, (_, i) => ({
  id: `${i}`,
  name: '',
  amount: '',
  currency: '',
  percent: '',
  createdAt: '',
}));

const StyledTableCell = styled(TableCell)({
  borderColor: 'white',
  [`&.${tableCellClasses.head}`]: {
    fontSize: 10,
    color: '#808191',
    backgroundColor: 'rgba(228, 228, 228, 0.2)',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: '#11142D',
    height: '5rem',
  },
  '&:first-of-type': {
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
  },
  '&:last-of-type': {
    borderTopRightRadius: '12px',
    borderBottomRightRadius: '12px',
  },
});

const StyledTableRow = styled(TableRow)({
  border: 0,
  '&:nth-of-type(even)': {
    backgroundColor: 'rgba(228, 228, 228, 0.2)',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
});

const AssetsTable: FC = () => {
  const { data, loading } = useAssetsQuery();

  console.log(data);

  const tableData = React.useMemo(
    () => (loading ? loadData : data?.assets),
    [loading, data]
  );

  return (
    <TableContainer>
      <Table sx={{ borderCollapse: 'separate' }}>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>ASSET</StyledTableCell>
            <StyledTableCell>CURRENCY</StyledTableCell>
            <StyledTableCell>AMOUNT</StyledTableCell>
            <StyledTableCell>PERCENT</StyledTableCell>
            <StyledTableCell>CREATED</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell> {row.name}</StyledTableCell>
              <StyledTableCell> {row.currency}</StyledTableCell>
              <StyledTableCell> {row.amount}</StyledTableCell>
              <StyledTableCell> {row.percent}</StyledTableCell>
              <StyledTableCell> {row.createdAt}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AssetsTable;
