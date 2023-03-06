import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../dataLayer/slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer
  },
})