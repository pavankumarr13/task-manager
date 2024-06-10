import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = "https://localhost:5001/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URI }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "tasks",
    }),
    getTask: builder.query({
      query: (id) => `tasks/${id}`,
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
    }),
    updateTask: builder.mutation({
      query: ({ id, task }) => ({
        url: `tasks/${id}`,
        method: "PUT",
        body: task,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
