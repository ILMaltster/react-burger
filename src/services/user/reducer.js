import { createSlice } from "@reduxjs/toolkit";
import { 
    fetchLogin, fetchRegister, fetchForgotPassword, fetchResetPassword,
    fetchGetUser, fetchPatchUser, fetchLogout, checkUser
} from "./actions";
import { useReducer } from "react";

const userSlice = createSlice({
    name: "user",
    initialState:{
        user: null,
        isAuthChecked: false,
        AuthError: false,
        profileLoading: false,
        profileError: null,
        newProfileDataApplied: false,
        newProfileDataAppliedError: null
    },
    reducers:{
        setAuthChecked: (state, payload)=>{
            state.isAuthChecked = payload;
        },
        setUser: (state, payload)=>{
            state.user = payload;
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchLogin.fulfilled, (state, action)=>{
                state.isAuthChecked = true;
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("refreshToken", action.payload.refreshToken);
                state.user = action.payload.user;
            })
            .addCase(fetchLogin.pending, (state, action)=>{
                state.isAuthChecked = false;
            })
            .addCase(fetchLogin.rejected, (state, action)=>{
                state.isAuthChecked = true;
                state.AuthError = action.payload;
            })
            .addCase(fetchRegister.fulfilled, (state, action)=>{
                state.isAuthChecked = true;
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("refreshToken", action.payload.refreshToken);
                state.user = action.payload.user;
            })
            .addCase(fetchRegister.pending, (state, action)=>{
                state.isAuthChecked = false;
            })
            .addCase(fetchRegister.rejected, (state, action)=>{
                state.isAuthChecked = true;
                state.AuthError = action.payload;
            })
            .addCase(fetchForgotPassword.fulfilled, (state, action)=>{})
            .addCase(fetchResetPassword.fulfilled, (state, action)=>{})
            .addCase(fetchLogout.fulfilled, (state, action)=>{
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                state.user = null;
            })
            .addCase(fetchGetUser.fulfilled, (state, action)=>{
                state.profileLoading = true;
                state.user = action.payload.user;
            })
            .addCase(fetchGetUser.pending, (state, action)=>{
                state.profileLoading = false;
            })
            .addCase(fetchGetUser.rejected, (state, action)=>{
                state.profileLoading = true;
                state.profileError = action.payload;
            })
            .addCase(fetchPatchUser.fulfilled, (state, action)=>{
                state.newProfileDataApplied = true;
                state.user = action.payload.user;
            })
            .addCase(fetchPatchUser.pending, (state, action)=>{
                state.newProfileDataApplied = false;
            })
            .addCase(fetchPatchUser.rejected, (state, action)=>{
                state.newProfileDataApplied = false;
                state.newProfileDataAppliedError = action.error;
            })
            .addCase(checkUser.fulfilled,(state, action)=>{
                state.user = action.payload?.user;
                state.isAuthChecked = true;
            });
    }
})

export const {setAuthChecked, setUser} = userSlice.actions;
export const userReducer = userSlice.reducer