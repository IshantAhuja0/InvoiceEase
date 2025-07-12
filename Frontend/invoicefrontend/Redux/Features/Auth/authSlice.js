import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  user: {
    email: "",
    jwt: ""
  }
}
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state, action) => {
      state.user = {
        email: "",
        jwt: ""
      }
    }
  }
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer