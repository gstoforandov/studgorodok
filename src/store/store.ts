import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authSlice } from '../entities/auth/api/authApi';
import { vkSlice } from '../entities/vk-news/api/vkApi';
import { scheduleSlice } from '../entities/schedule/scheduleApi';

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [vkSlice.reducerPath]: vkSlice.reducer,
    [scheduleSlice.reducerPath]: scheduleSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(scheduleSlice.middleware,authSlice.middleware, vkSlice.middleware)
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
