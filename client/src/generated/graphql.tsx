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
  /** The owner user of the asset */
  user?: Maybe<User>;
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

export type CreateAssetInput = {
  /** Assets limit */
  limit: Scalars['Float'];
  /** Assets offset */
  offset: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create asset */
  createAsset: Asset;
  /** Delete asset */
  deleteAsset: Scalars['Float'];
  /** Login user */
  signIn: User;
  /** Logout user */
  signOut: Scalars['Boolean'];
};


export type MutationCreateAssetArgs = {
  input: AssetInput;
};


export type MutationDeleteAssetArgs = {
  id: Scalars['Float'];
};


export type MutationSignInArgs = {
  idToken: Scalars['String'];
};

export type PaginatedAssets = {
  __typename?: 'PaginatedAssets';
  assets: Array<Asset>;
  hasNextPage: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  /** Get asset by id */
  asset?: Maybe<Asset>;
  /** Get all assets */
  assets?: Maybe<PaginatedAssets>;
  /** Get user from session */
  currentUser?: Maybe<User>;
};


export type QueryAssetArgs = {
  id: Scalars['Float'];
};


export type QueryAssetsArgs = {
  input: CreateAssetInput;
};

/** User model */
export type User = {
  __typename?: 'User';
  /** Assets of the user */
  assets?: Maybe<Array<Asset>>;
  /** The email of the user */
  email: Scalars['String'];
  /** The first name of the user */
  firstName: Scalars['String'];
  /** The google id of the User */
  googleId?: Maybe<Scalars['String']>;
  /** The id of the User */
  id: Scalars['ID'];
  /** The last name of the user */
  lastName: Scalars['String'];
};

export type RegularAssetFragment = { __typename?: 'Asset', id: string, name: string, amount: number, currency: string, percent?: number | null, increase?: string | null, interval?: number | null, createdAt: string, updatedAt: string };

export type CreateAssetMutationVariables = Exact<{
  input: AssetInput;
}>;


export type CreateAssetMutation = { __typename?: 'Mutation', createAsset: { __typename?: 'Asset', id: string, name: string, amount: number, currency: string, percent?: number | null, increase?: string | null, interval?: number | null, createdAt: string, updatedAt: string } };

export type DeleteAssetMutationVariables = Exact<{
  deleteAssetId: Scalars['Float'];
}>;


export type DeleteAssetMutation = { __typename?: 'Mutation', deleteAsset: number };

export type SignInMutationVariables = Exact<{
  idToken: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', id: string, googleId?: string | null, firstName: string, lastName: string, email: string } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: boolean };

export type AssetsQueryVariables = Exact<{
  input: CreateAssetInput;
}>;


export type AssetsQuery = { __typename?: 'Query', assets?: { __typename?: 'PaginatedAssets', hasNextPage: boolean, assets: Array<{ __typename?: 'Asset', id: string, name: string, amount: number, currency: string, percent?: number | null, increase?: string | null, interval?: number | null, createdAt: string, updatedAt: string }> } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, googleId?: string | null, firstName: string, lastName: string, email: string } | null };

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
export const DeleteAssetDocument = gql`
    mutation DeleteAsset($deleteAssetId: Float!) {
  deleteAsset(id: $deleteAssetId)
}
    `;
export type DeleteAssetMutationFn = Apollo.MutationFunction<DeleteAssetMutation, DeleteAssetMutationVariables>;

/**
 * __useDeleteAssetMutation__
 *
 * To run a mutation, you first call `useDeleteAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAssetMutation, { data, loading, error }] = useDeleteAssetMutation({
 *   variables: {
 *      deleteAssetId: // value for 'deleteAssetId'
 *   },
 * });
 */
export function useDeleteAssetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAssetMutation, DeleteAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAssetMutation, DeleteAssetMutationVariables>(DeleteAssetDocument, options);
      }
export type DeleteAssetMutationHookResult = ReturnType<typeof useDeleteAssetMutation>;
export type DeleteAssetMutationResult = Apollo.MutationResult<DeleteAssetMutation>;
export type DeleteAssetMutationOptions = Apollo.BaseMutationOptions<DeleteAssetMutation, DeleteAssetMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($idToken: String!) {
  signIn(idToken: $idToken) {
    id
    googleId
    firstName
    lastName
    email
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      idToken: // value for 'idToken'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const AssetsDocument = gql`
    query Assets($input: CreateAssetInput!) {
  assets(input: $input) {
    assets {
      ...RegularAsset
    }
    hasNextPage
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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssetsQuery(baseOptions: Apollo.QueryHookOptions<AssetsQuery, AssetsQueryVariables>) {
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
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    googleId
    firstName
    lastName
    email
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;