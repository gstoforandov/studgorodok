import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const vk_api_key = import.meta.env.VITE_NEWS_API
export const vkSlice = createApi({
  reducerPath: 'vk',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  endpoints: (builder) => ({
    getWalls: builder.mutation({
      query: () => ({
        url: '/vkapi',
        method: 'POST',
        body: {
          bearer: vk_api_key,
          params: {
            domain: 'ictis_sfedu',
            count: 5,
            v: 5.199,
            access_token: localStorage.getItem('vk_access_token'),
          }
        },
      })
    })
  })
})

export const {
  useGetWallsMutation,
} = vkSlice