import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { 
    fetchLogin, fetchRegister, fetchForgotPassword, fetchResetPassword,
    fetchGetUser, fetchPatchUser, fetchLogout, checkUser
} from "./actions";
import {TUserInitialState} from "../../utils/redux-types/data";
import {IGetUserResponse, TLoginDataWithTokenResponse, TUserData} from "../../utils/types";

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
    extraReducers: {
        [fetchLogin.fulfilled.type]: (state, action: PayloadAction<TLoginDataWithTokenResponse>)=>{
            state.isAuthChecked = true;
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            state.user = action.payload.user;
        },
        [fetchLogin.pending.type]: (state)=>{
            state.isAuthChecked = false;
        },
        [fetchLogin.rejected.type]: (state, action: PayloadAction<string>)=>{
            state.isAuthChecked = true;
            state.AuthError = action.payload;
        },
        [fetchRegister.fulfilled.type]: (state, action: PayloadAction<TLoginDataWithTokenResponse>)=>{
            state.isAuthChecked = true;
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            state.user = action.payload.user;
        },
        [fetchRegister.pending.type]: (state)=>{
            state.isAuthChecked = false;
        },
        [fetchRegister.rejected.type]: (state, action: PayloadAction<string>)=>{
            state.isAuthChecked = true;
            state.AuthError = action.payload;
        },
        [fetchForgotPassword.fulfilled.type]: ()=>{},
        [fetchResetPassword.fulfilled.type]: ()=>{},
        [fetchLogout.fulfilled.type]: (state)=>{
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            state.user = null;
        },
        [fetchGetUser.fulfilled.type]: (state, action: PayloadAction<IGetUserResponse>)=>{
            state.profileLoading = true;
            state.user = action.payload.user;
        },
        [fetchGetUser.pending.type]: (state)=>{
            state.profileLoading = false;
        },
        [fetchGetUser.rejected.type]: (state, action: PayloadAction<string>)=>{
            state.profileLoading = true;
            state.profileError = action.payload;
        },
        [fetchPatchUser.fulfilled.type]: (state, action: PayloadAction<IGetUserResponse>)=>{
            state.newProfileDataApplied = true;
            state.user = action.payload.user;
        },
        [fetchPatchUser.pending.type]: (state)=>{
            state.newProfileDataApplied = false;
        },
        [fetchPatchUser.rejected.type]: (state, action: PayloadAction<string>)=>{
            state.newProfileDataApplied = false;
            state.newProfileDataAppliedError = action.payload;
        },
        [checkUser.fulfilled.type]: (state, action: PayloadAction<IGetUserResponse>)=>{
            state.user = action.payload?.user;
            state.isAuthChecked = true;
        },
        [checkUser.rejected.type]: (state, action: PayloadAction<IGetUserResponse>)=>{
            state.user = action.payload.user;
            state.isAuthChecked = true;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            state.user = null;
        }
    }
})

export const {setAuthChecked, setUser} = userSlice.actions;
export const userReducer = userSlice.reducer