import React, { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import AssetsTable from '../../components/Wallet/AssetsTable';
import useToggle from '../../customHooks/useToggle';

const Assets: FC = () => {
  const [openAddAsset, toggleAddAsset] = useToggle(false);

  return (
    <Box display="flex">
      <Box>
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
            onClick={toggleAddAsset}
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
                openAddAsset && {
                  transform: 'rotate(45deg)',
                },
              ]}
            />
          </Button>
        </Box>
        <AssetsTable />
      </Box>
    </Box>
  );
};

export default Assets;
