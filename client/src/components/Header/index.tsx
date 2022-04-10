import React, { FC, memo, useCallback } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { User, useSignOutMutation } from '../../generated/graphql';
import Language from './Language';

interface Props {
  user?: User | null;
}

const Header: FC<Props> = ({ user }) => {
  const [signOut, { client }] = useSignOutMutation();

  const onSignOut = useCallback(async () => {
    await signOut();
    await client.resetStore();
  }, [client, signOut]);

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      component="header"
      height="100px"
      p="30px"
    >
      <Language />
      <Typography ml="1rem">
        {user?.lastName}&nbsp;
        {user?.firstName}
      </Typography>
      <IconButton
        sx={{ marginLeft: '1rem' }}
        aria-label="sign-out"
        onClick={onSignOut}
      >
        <Logout />
      </IconButton>
    </Box>
  );
};

export default memo(Header);
