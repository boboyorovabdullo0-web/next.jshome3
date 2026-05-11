import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UsersResponse, Post, PostsResponse, Todo, TodosResponse } from "../types";

export const dummyApi = createApi({
  reducerPath: "dummyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, { limit?: number; skip?: number; q?: string }>({
      query: ({ limit = 30, skip = 0, q = "" }) => 
        q ? `users/search?q=${q}&limit=${limit}&skip=${skip}` : `users?limit=${limit}&skip=${skip}`,
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation<{ id: number; isDeleted: boolean }, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }, { type: "User", id: "LIST" }],
    }),
    getUserPosts: builder.query<PostsResponse, number>({
      query: (id) => `users/${id}/posts`,
    }),
    getUserTodos: builder.query<TodosResponse, number>({
      query: (id) => `users/${id}/todos`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useGetUserPostsQuery,
  useGetUserTodosQuery,
} = dummyApi;
