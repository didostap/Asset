import { Reference } from '@apollo/client';
import { useCallback, useMemo } from 'react';
import {
  Asset,
  useAssetsQuery,
  useDeleteAssetMutation,
} from '../../../generated/graphql';

interface UseAssets {
  assets: Asset[];
  hasNextPage: boolean;
  deleteAsset: (id: string) => () => void;
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

  const [removeAsset] = useDeleteAssetMutation();

  const deleteAsset = useCallback(
    (id: string) => () => {
      removeAsset({
        variables: { deleteAssetId: +id },
        update(cache) {
          cache.modify({
            fields: {
              assets(existingAssetsRefs, { readField }) {
                const updatedAssets = existingAssetsRefs.assets.filter(
                  (taskRef: Reference) => readField('id', taskRef) !== id
                );

                return {
                  assets: updatedAssets,
                  hasNextPage: existingAssetsRefs.hasNextPage,
                };
              },
            },
          });
        },
      });
    },
    [removeAsset]
  );
  const isData = !loading && data?.assets;

  return useMemo(
    () => ({
      deleteAsset,
      loadMoreAssets,
      assets: isData ? data!.assets!.assets : [],
      hasNextPage: isData ? data!.assets!.hasNextPage : false,
    }),
    [isData, data, deleteAsset, loadMoreAssets]
  );
};

export default useAssets;
