import * as auth from "../services/auth"

const SET_USER = "session/setUser"
const REMOVE_USER = "session/removeUser"
const UPDATE_USER = "session/updateUser"

export const setUser = user => {
    return {
        type: SET_USER,
        user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export const restore = () => async dispatch => {
    const user = await auth.authenticate()
    if (user.id) dispatch(setUser(user)) // only set the user state if the route doesn't return errors
    return user
}

export const login = (email, password) => async dispatch => {
    const user = await auth.login(email, password)
    if (user.id) dispatch(setUser(user)) // only set the user state if the route doesn't return errors
    return user
}

export const signup = (first_name, last_name, email, password) => async dispatch => {
    console.log("Im hitting signup in store!!")
    const user = await auth.signUp(first_name, last_name, email, password)
    if (user.id) dispatch(setUser(user)) // only set the user state if the route doesn't return errors
    return user
}

export const logout = () => async dispatch => {
    const response = await auth.logout()
    dispatch(removeUser())
    return response
}

export const alterUser = (payload) => async dispatch => {
    console.log("hitting the alter user thunk!!");
    const response = await fetch(`/api/users/${payload.userId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(updateUser(data.user))
    }
}

const initialState = {
    user: null
}

const sessionReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_USER:
            newState = { ...state }
            newState.user = action.user
            return newState
        case UPDATE_USER: {
            console.log("in update user reducer")
            newState = { ...state }
            newState.user = action.payload
            return newState
        }
        case REMOVE_USER:
            newState = { ...state };
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer
