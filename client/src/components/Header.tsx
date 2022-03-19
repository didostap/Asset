import React, { FC, memo, useCallback } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { User, useSignOutMutation } from '../generated/graphql';

interface Props {
  user?: User | null;
}

const Header: FC<Props> = ({ user }) => {
  const [signOut, { client }] = useSignOutMutation({
    /*Update cache to trigger rerender because clearStore won't*/
    update(cache) {
      cache.modify({
        fields: {
          currentUser() {
            return null;
          },
        },
      });
    },
  });

  const onSignOut = useCallback(async () => {
    await signOut();
    /*Use clearStode instead of resetStore to omit refetching queries which need cooikes*/
    await client.clearStore();
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
      <Typography>
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
