import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Slice/authSlice";
import bookingReducer from "./Slice/bookigSlice"
import counselorReducer from "./Slice/counselorSlice"
import paymentReducer from './Slice/paymentslice'


export const store = configureStore({
reducer: { 
    auth: authReducer,
    booking: bookingReducer,
    counselors: counselorReducer,
    payment: paymentReducer
} ,
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch





