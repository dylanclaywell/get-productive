export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateTodoItemInput = {
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodoItem?: Maybe<TodoItem>;
};


export type MutationCreateTodoItemArgs = {
  input: CreateTodoItemInput;
};

export type Query = {
  __typename?: 'Query';
  todoItem?: Maybe<TodoItem>;
  todoItems: Array<TodoItem>;
};


export type QueryTodoItemArgs = {
  id: Scalars['String'];
};

export type TodoItem = {
  __typename?: 'TodoItem';
  dateCompleted?: Maybe<Scalars['String']>;
  dateCreated: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
  notes?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};
