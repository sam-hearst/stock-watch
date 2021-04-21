import { setUser } from "./session"

const LOAD_HOLDINGS = "holdings/LOAD"
const LOAD_HOLDING = "holding/LOAD"
const ADD_HOLDING = "holding/ADD"
const UPDATE_HOLDING = "holding/UPDATE"
const REMOVE_HOLDING = "holding/DELETE"

const load = (holdings) => {
    return {
        type: LOAD_HOLDINGS,
        holdings
    }
}

export const loadOneHolding = (holding) => {
    return {
        type: LOAD_HOLDING,
        holding
    }
}

const addHolding = (holding) => {
    return {
        type: ADD_HOLDING,
        payload: holding
    }
}

const alterHolding = (holding) => {
    return {
        type: UPDATE_HOLDING,
        payload: holding
    }
}

const removeOne = (stockId) => {
    return {
        type: REMOVE_HOLDING,
        payload: stockId
    }
}

export const getHoldings = () => async (dispatch) => {
    const response = await fetch(`/api/holdings/`);

    if (response.ok) {
        const data = await response.json();
        dispatch(load(data.holdings));
        return data;
    }
}

export const getHolding = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/holdings/${ticker}`);

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(loadOneHolding(data.holding));
        return data
    }
}

export const buyHolding = (payload) => async (dispatch) => {
    console.log("Hitting buy holding THUNK", payload);
    const response = await fetch(`/api/holdings/${payload.stockTicker}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    })

    if (!response.ok) throw response;
    const data = await response.json();
    console.log(data);
    dispatch(addHolding(data.holding));
    dispatch(setUser(data.user))
    return data
}



export const updateHolding = (payload) => async (dispatch) => {
    console.log("HITTING UPDATE THUNK", payload)
    const response = await fetch(`/api/holdings/${payload.stockTicker}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    });

    if (response.ok) {
        const data = await response.json();
        // updating so that it's quicker
        dispatch(alterHolding(data.holding))
        dispatch(setUser(data.user))
        return data;
    }
}

export const deleteHolding = (payload) => async (dispatch) => {
    console.log("Hitting Delete Thunk", payload)
    const response = await fetch(`/api/holdings/${payload.stockTicker}`, {
        method: "DELETE",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    })
    if (response.ok) {
        const data = await response.json();
        console.log(data.holding.id);
        dispatch(removeOne(data.holding.id))
        dispatch(setUser(data.user))
        return data
    }
}


const initialState = {}

const holdingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_HOLDINGS:
            newState = {};
            action.holdings.forEach(holding => {
                newState[holding.id] = holding
            })
            return newState;
        case ADD_HOLDING: {
            newState = Object.assign({}, state, { [action.payload.id]: action.payload })
            return newState;
        }
        case UPDATE_HOLDING: {
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case REMOVE_HOLDING: {
            newState = { ...state }
            delete newState[action.payload]
            return newState;
        }
        default:
            return state;
    }
}


export default holdingReducer;
