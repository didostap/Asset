import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        assets: {
          keyArgs: false,
          merge(existing = { assets: [], hasNextPage: false }, incoming) {
            const { assets: existingAssets, ...restExisting } = existing;
            const { assets: incomingAssets, ...restIcoming } = incoming;

            return {
              ...restExisting,
              ...restIcoming,
              assets: [...existingAssets, ...incomingAssets],
            };
          },
        },
      },
    },
  },
});
