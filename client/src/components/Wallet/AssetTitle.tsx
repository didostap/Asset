import React, { FC } from 'react';
import { Add } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';

interface Props {
  open: boolean;
  toggle: () => void;
}

const AssetTitle: FC<Props> = ({open, toggle}) => {
  return (
    <Box
      mb="2rem"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h6" component="h1">
        Asset Balances
      </Typography>
      <Button
        size="small"
        disableRipple
        variant="contained"
        onClick={toggle}
        sx={{ borderRadius: '30px', minWidth: '0px', height: '40px' }}
      >
        <Add
          fontSize="small"
          sx={[
            {
              transform: 'rotate(0deg)',
              transition: (theme) =>
                theme.transitions.create('all', {
                  duration: theme.transitions.duration.shortest,
                }),
            },
            open && {
              transform: 'rotate(45deg)',
            },
          ]}
        />
      </Button>
    </Box>
  );
};

export default AssetTitle;
