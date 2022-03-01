import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  /** The type of increase interval of the asset */
  increase?: Maybe<Scalars['String']>;
  /** The increase interval of the asset */
  interval?: Maybe<Scalars['Float']>;
  /** The name of the asset */
  name: Scalars['String'];
  /** The percent of the asset */
  percent?: Maybe<Scalars['Float']>;
  /** The asset updated date */
  updatedAt: Scalars['String'];
};

export type AssetInput = {
  /** Asset amount */
  amount: Scalars['Float'];
  /** Asset currency */
  currency: Scalars['String'];
  /** Type of asset increase interval */
  increase?: InputMaybe<Scalars['String']>;
  /** Asset increase interval */
  interval?: InputMaybe<Scalars['Float']>;
  /** Asset name */
  name: Scalars['String'];
  /** Asset percent */
  percent?: InputMaybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create asset */
  createAsset: Asset;
};


export type MutationCreateAssetArgs = {
  input: AssetInput;
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

export type RegularAssetFragment = { __typename?: 'Asset', id: string, name: string, amount: number, currency: string, percent?: number | null, increase?: string | null, interval?: number | null, createdAt: string, updatedAt: string };

export type CreateAssetMutationVariables = Exact<{
  input: AssetInput;
}>;


export type CreateAssetMutation = { __typename?: 'Mutation', createAsset: { __typename?: 'Asset', id: string, name: string, amount: number, currency: string, percent?: number | null, increase?: string | null, interval?: number | null, createdAt: string, updatedAt: string } };

export type AssetsQueryVariables = Exact<{ [key: string]: never; }>;


export type AssetsQuery = { __typename?: 'Query', assets?: Array<{ __typename?: 'Asset', id: string, name: string, amount: number, currency: string, percent?: number | null, increase?: string | null, interval?: number | null, createdAt: string, updatedAt: string }> | null };

export const RegularAssetFragmentDoc = gql`
    fragment RegularAsset on Asset {
  id
  name
  amount
  currency
  percent
  increase
  interval
  createdAt
  updatedAt
}
    `;
export const CreateAssetDocument = gql`
    mutation CreateAsset($input: AssetInput!) {
  createAsset(input: $input) {
    ...RegularAsset
  }
}
    ${RegularAssetFragmentDoc}`;
export type CreateAssetMutationFn = Apollo.MutationFunction<CreateAssetMutation, CreateAssetMutationVariables>;

/**
 * __useCreateAssetMutation__
 *
 * To run a mutation, you first call `useCreateAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssetMutation, { data, loading, error }] = useCreateAssetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAssetMutation(baseOptions?: Apollo.MutationHookOptions<CreateAssetMutation, CreateAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAssetMutation, CreateAssetMutationVariables>(CreateAssetDocument, options);
      }
export type CreateAssetMutationHookResult = ReturnType<typeof useCreateAssetMutation>;
export type CreateAssetMutationResult = Apollo.MutationResult<CreateAssetMutation>;
export type CreateAssetMutationOptions = Apollo.BaseMutationOptions<CreateAssetMutation, CreateAssetMutationVariables>;
export const AssetsDocument = gql`
    query Assets {
  assets {
    ...RegularAsset
  }
}
    ${RegularAssetFragmentDoc}`;

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
export function useAssetsQuery(baseOptions?: Apollo.QueryHookOptions<AssetsQuery, AssetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssetsQuery, AssetsQueryVariables>(AssetsDocument, options);
      }
export function useAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssetsQuery, AssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssetsQuery, AssetsQueryVariables>(AssetsDocument, options);
        }
export type AssetsQueryHookResult = ReturnType<typeof useAssetsQuery>;
export type AssetsLazyQueryHookResult = ReturnType<typeof useAssetsLazyQuery>;
export type AssetsQueryResult = Apollo.QueryResult<AssetsQuery, AssetsQueryVariables>;