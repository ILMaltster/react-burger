import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { 
    fetchLogin, fetchRegister, fetchForgotPassword, fetchResetPassword,
    fetchGetUser, fetchPatchUser, fetchLogout, checkUser
} from "./actions";
import {TUserInitialState} from "../../utils/redux-types/data";
import {IGetUserResponse, TUserData} from "../../utils/types";

const initialState: TUserInitialState = {
    user: null,
    isAuthChecked: false,
    AuthError: '',
    profileLoading: false,
    profileError: '',
    newProfileDataApplied: false,
    newProfileDataAppliedError: ''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setAuthChecked: (state, action: PayloadAction<boolean>)=>{
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action: PayloadAction<TUserData | null>)=>{
            state.user = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchLogin.fulfilled, (state, action)=> {
                state.isAuthChecked = true;
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("refreshToken", action.payload.refreshToken);
                state.user = action.payload.user;
            })
            .addCase(fetchLogin.pending, (state)=> {
                state.isAuthChecked = false;
            })
            .addCase(fetchLogin.rejected, (state, action)=> {
                state.isAuthChecked = true;
                state.AuthError = action.error.message;
            })
            .addCase(fetchRegister.fulfilled, (state, action)=> {
                state.isAuthChecked = true;
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("refreshToken", action.payload.refreshToken);
                state.user = action.payload.user;
            })
            .addCase(fetchRegister.pending, (state)=> {
                state.isAuthChecked = false;
            })
            .addCase(fetchRegister.rejected, (state, action)=> {
                state.isAuthChecked = true;
                state.AuthError = action.error.message;
            })
            .addCase(fetchForgotPassword.fulfilled, ()=>{})
            .addCase(fetchResetPassword.fulfilled, ()=>{})
            .addCase(fetchLogout.fulfilled, (state)=> {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                state.user = null;
            })
            .addCase(fetchGetUser.fulfilled, (state, action)=> {
                state.profileLoading = true;
                state.user = action.payload.user;
            })
            .addCase(fetchGetUser.pending, (state)=> {
                state.profileLoading = false;
            })
            .addCase(fetchGetUser.rejected, (state, action)=> {
                state.profileLoading = true;
                state.profileError = action.error.message;
            })
            .addCase(fetchPatchUser.fulfilled, (state, action: PayloadAction<IGetUserResponse>)=> {
                state.newProfileDataApplied = true;
                state.user = action.payload.user;
            })
            .addCase(fetchPatchUser.pending, (state)=> {
                state.newProfileDataApplied = false;
            })
            .addCase(fetchPatchUser.rejected, (state, action)=> {
                state.newProfileDataApplied = false;
                state.newProfileDataAppliedError = action.error.message;
            })
            .addCase(checkUser.fulfilled, (state, action)=> {
                state.user = action.payload!?.user;
                state.isAuthChecked = true;
            })
            .addCase(checkUser.rejected, (state)=>{
                state.isAuthChecked = true;
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                state.user = null;
            })
    }
})

export const {setAuthChecked, setUser} = userSlice.actions;
export const userReducer = userSlice.reducer