import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scheduleSlice = createApi({
  reducerPath: 'schedule',
  baseQuery: fetchBaseQuery({baseUrl: 'https://ictis.ru'}),
  endpoints: (builder) => ({
    getSchedule: builder.query({
      query: ({query, week = ''}) => ({
        url: `/api?request=schedule&group=${query}${week}`,
        method: 'GET',
      })
    })
  }),
})

export const {
  useLazyGetScheduleQuery
} = scheduleSlice;