import { AuthenticationError } from 'apollo-server-core';

type AuthPermission = (args: {
  isUser: boolean;
  operationName: string;
}) => void;

export const authPermission: AuthPermission = ({
  isUser,
  operationName,
}): void => {
  if (
    !isUser &&
    operationName !== 'CurrentUser' &&
    operationName !== 'SignIn'
  ) {
    throw new AuthenticationError('You must be logged in');
  }
};
