import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vkSlice = createApi({
  reducerPath: 'vk',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3004',
  }),
  endpoints: (builder) => ({
    getWalls: builder.query({
      query: (body) => ({
        url: '/vkapi',
        method: 'POST',
        body,
      })
    })
  })
})

export const {
  useGetWallsQuery,
} = vkSlice