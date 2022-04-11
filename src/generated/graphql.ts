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

export type Filters = {
  overrideIncompleteItems?: InputMaybe<Scalars['Boolean']>;
};

export type GetDateInput = {
  date?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
};

export type GetTodoItemsInput = {
  dateCompleted?: InputMaybe<GetDateInput>;
  dateCreated?: InputMaybe<GetDateInput>;
  description?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Filters>;
  id?: InputMaybe<Scalars['ID']>;
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  notes?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTag: Tag;
  createTodoItem: TodoItem;
  deleteTag: Status;
  deleteTodoItem: Scalars['String'];
  setTheme: Scalars['Boolean'];
  updateTag: Tag;
  updateTodoItem: TodoItem;
};


export type MutationCreateTagArgs = {
  color: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateTodoItemArgs = {
  input: CreateTodoItemInput;
};


export type MutationDeleteTagArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTodoItemArgs = {
  id: Scalars['String'];
};


export type MutationSetThemeArgs = {
  theme: Scalars['String'];
};


export type MutationUpdateTagArgs = {
  color?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTodoItemArgs = {
  input: UpdateTodoItemInput;
};

export type Query = {
  __typename?: 'Query';
  tags: Array<Tag>;
  theme: Theme;
  todoItem?: Maybe<TodoItem>;
  todoItems: Array<TodoItem>;
};


export type QueryTodoItemArgs = {
  id: Scalars['String'];
};


export type QueryTodoItemsArgs = {
  input: GetTodoItemsInput;
};

export type Status = {
  __typename?: 'Status';
  success: Scalars['Boolean'];
};

export type Tag = {
  __typename?: 'Tag';
  color: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type TagInput = {
  id: Scalars['ID'];
};

export type Theme = {
  __typename?: 'Theme';
  type: Scalars['String'];
};

export type TodoItem = {
  __typename?: 'TodoItem';
  dateCompleted?: Maybe<Date>;
  dateCreated: Date;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
  notes?: Maybe<Scalars['String']>;
  tags: Array<Tag>;
  title: Scalars['String'];
};

export type UpdateTodoItemInput = {
  dateCompleted?: InputMaybe<DateInput>;
  dateCreated?: InputMaybe<DateInput>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  notes?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<TagInput>>;
  title?: InputMaybe<Scalars['String']>;
};
