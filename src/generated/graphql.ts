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
  dateCreated: DateInput;
  title: Scalars['String'];
};

export type Date = {
  __typename?: 'Date';
  date: Scalars['String'];
  time: Scalars['String'];
  timezone: Scalars['String'];
};

export type DateInput = {
  date: Scalars['String'];
  time: Scalars['String'];
  timezone: Scalars['String'];
};

export type GetTodoItemsInput = {
  dateCompleted?: InputMaybe<DateInput>;
  dateCreated?: InputMaybe<DateInput>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  notes?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodoItem: TodoItem;
  deleteTodoItem: Scalars['String'];
  updateTodoItem: TodoItem;
};


export type MutationCreateTodoItemArgs = {
  input: CreateTodoItemInput;
};


export type MutationDeleteTodoItemArgs = {
  id: Scalars['String'];
};


export type MutationUpdateTodoItemArgs = {
  input: UpdateTodoItemInput;
};

export type Query = {
  __typename?: 'Query';
  todoItem?: Maybe<TodoItem>;
  todoItems: Array<TodoItem>;
};


export type QueryTodoItemArgs = {
  id: Scalars['String'];
};


export type QueryTodoItemsArgs = {
  input?: InputMaybe<GetTodoItemsInput>;
};

export type TodoItem = {
  __typename?: 'TodoItem';
  dateCompleted?: Maybe<Date>;
  dateCreated: Date;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
  notes?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type UpdateTodoItemInput = {
  dateCompleted?: InputMaybe<DateInput>;
  dateCreated?: InputMaybe<DateInput>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  notes?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};
