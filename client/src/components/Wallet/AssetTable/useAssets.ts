import { useCallback } from 'react';
import { Asset, useAssetsQuery } from '../../../generated/graphql';

interface UseAssets {
  assets: Asset[];
  hasNextPage: boolean;
  loadMoreAssets: (startIndex: number, stopIndex: number) => void;
}

const useAssets = (): UseAssets => {
  const { data, loading, fetchMore } = useAssetsQuery({
    variables: {
      input: {
        offset: 0,
        limit: 10,
      },
    },
  });

  const loadMoreAssets = useCallback(() => {
    const offset = data!.assets!.assets.length;

    return fetchMore({
      variables: {
        input: {
          offset,
          limit: 10,
        },
      },
    });
  }, [data, fetchMore]);

  if (loading && !data?.assets)
    return {
      assets: [],
      hasNextPage: false,
      loadMoreAssets: () => {},
    };

  return {
    loadMoreAssets,
    assets: data!.assets!.assets,
    hasNextPage: data!.assets!.hasNextPage,
  };
};

export default useAssets;
