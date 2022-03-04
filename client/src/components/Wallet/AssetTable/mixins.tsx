import React from 'react';
import { styled } from '@mui/system';
import { TableCell, tableCellClasses, TableRow } from '@mui/material';

export const StyledTableRow = styled(
  (props) => <TableRow component="div" {...props} />,
  { shouldForwardProp: (prop) => prop !== 'even' }
)(({ even }: { even?: boolean }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '12px',
  backgroundColor: even ? 'rgba(228, 228, 228, 0.2)' : '',
}));

export const StyledTableCell = styled((props) => (
  <TableCell component="div" {...props} />
))({
  display: 'flex',
  alignItems: 'center',
  minWidth: '70px',
  borderColor: 'transparent',
  width: '100%',
  [`&.${tableCellClasses.head}`]: {
    fontSize: 10,
    height: '2.5rem',
    color: '#808191',
    backgroundColor: 'rgba(228, 228, 228, 0.2)',
    '&:first-of-type': {
      borderTopLeftRadius: '12px',
      borderBottomLeftRadius: '12px',
    },
    '&:last-of-type': {
      borderTopRightRadius: '12px',
      borderBottomRightRadius: '12px',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: '#11142D',
    height: '5rem',
  },
});
