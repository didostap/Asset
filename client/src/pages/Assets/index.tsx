import React, { FC } from 'react';
import { Box } from '@mui/material';
import AssetsTable from '../../components/Wallet/AssetsTable';
import AddAsset from '../../components/Wallet/AddAsset';
import useToggle from '../../customHooks/useToggle';
import AssetTitle from '../../components/Wallet/AssetTitle';

const Assets: FC = () => {
  const [openAddAsset, toggleAddAsset] = useToggle(false);

  return (
    <Box display="flex" sx={{overflow: 'hidden', marginRight: '-4rem'}}>
      <Box width="100%">
        <AssetTitle open={openAddAsset} toggle={toggleAddAsset} />
        <AssetsTable />
      </Box>
      <AddAsset open={openAddAsset} toggle={toggleAddAsset}/>
    </Box>
  );
};

export default Assets;
