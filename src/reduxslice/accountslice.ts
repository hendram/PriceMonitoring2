import { createSlice } from '@reduxjs/toolkit';

interface AccountState {
       value: string
}

const initialState: AccountState = {
   value: ""
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        accountfalse: (state) => {
                   state.value = "false";
                         },
        accounttrue: (state) => {
                    state.value = "true";
               },
        accountinit: (state) => {
                  state.value = "";
             },
           },
        })
     
export const { accountfalse, accounttrue, accountinit } = accountSlice.actions;

export default accountSlice.reducer;
