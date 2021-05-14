import { setUser } from "./session"

const LOAD_B_DETAILS = "b_detail/LOAD"
const ADD_B_DETAIL = "b_detail/ADD"
const REMOVE_B_DETAIL = "b_detail/DELETE"

const load = (details) => {
    return {
        type: LOAD_B_DETAILS,
        payload: details
    }
}

const addBDetail = (detail) => {
    return {
        type: ADD_B_DETAIL,
        payload: detail
    }
}

const removeOne = (detail) => {
    return {
        type: REMOVE_B_DETAIL,
        payload: detail
    }
}

export const getBDetails = () => async (dispatch) => {
    const response = await fetch(`/api/account/banking/`);

    if (response.ok) {
        const data = await response.json();
        dispatch(load(data.banking_details));
        return data;
    }
}


export const createBDetail = (payload) => async (dispatch) => {
    const response = await fetch(`/api/account/banking/`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    })

    if (!response.ok) throw response;
    const data = await response.json();
    console.log(data);
    dispatch(addBDetail(data));
    dispatch(setUser(data))
    return data
}


export const deleteBDetail = (payload) => async (dispatch) => {
    const response = await fetch(`/api/account/banking/`, {
        method: "DELETE",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(removeOne(data))
        dispatch(setUser(data))
        return data
    }
}


const initialState = {}

const bankingDetailsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_B_DETAILS:
            newState = {};
            action.payload.forEach(detail => {
                newState[detail.id] = detail
            })
            return newState;
        case ADD_B_DETAIL: {
            newState = Object.assign({}, state, { [action.payload.id]: action.payload })
            return newState;
        }
        case REMOVE_B_DETAIL: {
            newState = { ...state }
            delete newState[action.payload]
            return newState;
        }
        default:
            return state;
    }
}

export default bankingDetailsReducer
