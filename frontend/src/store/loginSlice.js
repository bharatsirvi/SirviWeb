import { createSlice} from '@reduxjs/toolkit'

const loginDataSlice = createSlice({
    name: 'logindata',
    initialState: { 
                name:"",
                mobile:"",
                password:"",
    },
    reducers: {
        setLoginData: (state, action) => {
            state = action.payload;
        }
    }
})

export const loginDataSliceAction = loginDataSlice.actions
export { loginDataSlice }
