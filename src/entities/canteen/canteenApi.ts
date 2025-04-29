import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface MealItem {
  name: string;
  description: string;
  price: number;
  calories: number;
}

interface DailyMenu {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
}
export const canteenSlice = createApi({
  reducerPath: 'canteenSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/canteen' }),
  endpoints: (builder) => ({
    getWeekDays: builder.query<string[], void>({
      query: () => ('/week'),
      transformResponse: (response: any[]) => response.map(({day}) => day)
    }),
    getDailyMenu: builder.query<DailyMenu, string>({
      query: (day) => `/menu/${encodeURIComponent(day)}`
    })
  })
});

export const { useGetWeekDaysQuery, useGetDailyMenuQuery} = canteenSlice;
