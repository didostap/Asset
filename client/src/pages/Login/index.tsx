import React from 'react';
import { Box } from '@mui/material';
import GoogleLogin from 'react-google-login';
import { useSignInMutation } from '../../generated/graphql';

const Login = () => {
  const [signIn] = useSignInMutation({
    update(cache, result) {
      cache.modify({
        fields: {
          currentUser() {
            return result.data?.signIn;
          },
        },
      });
    },
  });

  const handleSignIn = async (googleData: any) => {
    await signIn({ variables: { idToken: googleData.tokenId } });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box>
        <GoogleLogin
          onSuccess={handleSignIn}
          clientId="298295978358-t7mia8mji0119chnnf0lkpbv4v7lotdc.apps.googleusercontent.com"
        />
      </Box>
    </Box>
  );
};

export default Login;
