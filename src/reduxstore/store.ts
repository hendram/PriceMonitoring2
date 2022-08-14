import { configureStore } from '@reduxjs/toolkit'
import accountReducer from '../reduxslice/accountslice'

export const store = configureStore({
   reducer: {
        accountnya: accountReducer,
 },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
