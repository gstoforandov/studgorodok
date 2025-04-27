import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authSlice = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      })
    }),
    registration: builder.mutation({
      query: (body) => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      })
    })
  })
})

export const {
  useLoginMutation,
  useRegistrationMutation,
} = authSlice