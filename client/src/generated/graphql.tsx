import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Asset model */
export type Asset = {
  __typename?: 'Asset';
  /** The amount of the asset */
  amount: Scalars['Float'];
  /** The asset created date */
  createdAt: Scalars['String'];
  /** The currency of the asset */
  currency: Scalars['String'];
  /** The id of the asset */
  id: Scalars['ID'];
  /** The increase interval of the asset */
  increaseInterval: Scalars['Float'];
  /** The name of the asset */
  name: Scalars['String'];
  /** The percent of the asset */
  percent: Scalars['Float'];
  /** The asset updated date */
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create asset */
  createAsset: Asset;
};

export type MutationCreateAssetArgs = {
  amount: Scalars['Float'];
  currency: Scalars['String'];
  increaseInterval: Scalars['Float'];
  name: Scalars['String'];
  percent: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  /** Get asset by id */
  asset?: Maybe<Asset>;
  /** Get all assets */
  assets?: Maybe<Array<Asset>>;
};

export type QueryAssetArgs = {
  id: Scalars['Float'];
};

export type AssetsQueryVariables = Exact<{ [key: string]: never }>;

export type AssetsQuery = {
  __typename?: 'Query';
  assets?: Array<{
    __typename?: 'Asset';
    id: string;
    name: string;
    amount: number;
    currency: string;
    percent: number;
    increaseInterval: number;
    createdAt: string;
    updatedAt: string;
  }> | null;
};

export const AssetsDocument = gql`
  query Assets {
    assets {
      id
      name
      amount
      currency
      percent
      increaseInterval
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useAssetsQuery__
 *
 * To run a query within a React component, call `useAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAssetsQuery(
  baseOptions?: Apollo.QueryHookOptions<AssetsQuery, AssetsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AssetsQuery, AssetsQueryVariables>(
    AssetsDocument,
    options
  );
}
export function useAssetsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AssetsQuery, AssetsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AssetsQuery, AssetsQueryVariables>(
    AssetsDocument,
    options
  );
}
export type AssetsQueryHookResult = ReturnType<typeof useAssetsQuery>;
export type AssetsLazyQueryHookResult = ReturnType<typeof useAssetsLazyQuery>;
export type AssetsQueryResult = Apollo.QueryResult<
  AssetsQuery,
  AssetsQueryVariables
>;
