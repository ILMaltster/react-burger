import {initialState, userReducer} from "./reducer";
import {checkUser, fetchGetUser, fetchLogin, fetchLogout, fetchPatchUser, fetchRegister} from "./actions";
import {UserResponseSourceFake} from "../../utils/test-fake-data/user-reducer";

describe("user reducer", ()=>{
    it("should return initial state", ()=>{
        expect(
            userReducer(undefined, {})
        ).toEqual(initialState)
    })
    it("should set user", ()=>{
        expect(
            userReducer(undefined, fetchLogin.fulfilled(UserResponseSourceFake))
        ).toEqual({
            ...initialState,
            isAuthChecked: true,
            user: UserResponseSourceFake.user
        })
    })
    it("should set pending flags for user login response", ()=>{
        expect(
            userReducer({...initialState, isAuthChecked: true}, fetchLogin.pending())
        ).toEqual({
            ...initialState,
            isAuthChecked: false
        })
    })
    it("should set reject flags for user login response", ()=>{
        expect(
            userReducer({
                    ...initialState,
                    isAuthChecked: false
                },
                fetchLogin.rejected("test message"))
        ).toEqual({
            ...initialState,
            isAuthChecked: true,
            AuthError: "test message"
        })
    })
    it("should set user because of registration", ()=>{
        expect(
            userReducer(
                undefined,
                fetchRegister.fulfilled(UserResponseSourceFake)
            )
        ).toEqual({
            ...initialState,
            isAuthChecked: true,
            user: UserResponseSourceFake.user
        })
    })
    it("should set pending flags for registration login response", ()=>{
        expect(
            userReducer(
                {...initialState, isAuthChecked: true},
                fetchRegister.pending()
            )
        ).toEqual({
            ...initialState,
            isAuthChecked: false
        })
    })
    it("should set reject flags for registration login response", ()=>{
        expect(
            userReducer({
                    ...initialState,
                    isAuthChecked: false
                },
                fetchRegister.rejected("test message"))
        ).toEqual({
            ...initialState,
            isAuthChecked: true,
            AuthError: "test message"
        })
    })
    it("should set user to null because logout", ()=>{
        expect(
            userReducer({
                ...initialState,
                user: UserResponseSourceFake.user
            },
            fetchLogout.fulfilled()
        )).toEqual({...initialState, user: null})
    })
    it("should get user for profile", ()=>{
        expect(
            userReducer({
                ...initialState
                },
                fetchGetUser.fulfilled(UserResponseSourceFake)
            )
        ).toEqual({
            ...initialState,
            user: UserResponseSourceFake.user,
            profileLoading: true
        })
    })
    it("should set pending flags of user for profile getting", ()=>{
        expect(
            userReducer({
                    ...initialState,
                    profileLoading: true
                },
                fetchGetUser.pending()
            )
        ).toEqual({...initialState, profileLoading: false})
    })
    it("should set pathed user", ()=>{
        expect(
            userReducer({
                    ...initialState,
                    newProfileDataApplied: false
                },
                fetchPatchUser.fulfilled(UserResponseSourceFake)
            )
        ).toEqual({
            ...initialState,
            newProfileDataApplied: true,
            user: UserResponseSourceFake.user
        })
    })
    it("should set pathed user pending status", ()=>{
        expect(
            userReducer({
                    ...initialState,
                    newProfileDataApplied: true
                },
                fetchPatchUser.pending()
            )
        ).toEqual({
            ...initialState,
            newProfileDataApplied: false
        })
    })
    it("should set pathed user reject status", ()=>{
        expect(
            userReducer({
                    ...initialState,
                    newProfileDataApplied: true
                },
                fetchPatchUser.rejected("test message")
            )
        ).toEqual({
            ...initialState,
            newProfileDataApplied: false,
            newProfileDataAppliedError: "test message"
        })
    })
    it("should check user token", ()=>{
        expect(
            userReducer({
                    ...initialState,
                    isAuthChecked: false
                },
                checkUser.fulfilled(UserResponseSourceFake)
            )
        ).toEqual({
            ...initialState,
            user: UserResponseSourceFake.user,
            isAuthChecked: true
        })
    })
    it("should check user token reject", ()=>{
        expect(
            userReducer({
                    ...initialState,
                    isAuthChecked: false,
                    user: null
                },
                checkUser.rejected()
            )
        ).toEqual({
            ...initialState,
            user: null,
            isAuthChecked: true
        })
    })
})