const LOAD_HOLDINGS = "holdings/LOAD"
const LOAD_HOLDING = "holding/LOAD"
const ADD_HOLDING = "holding/ADD"

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
    console.log("hit here", payload);
    const response = await fetch(`/api/holdings/`, {
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
        default:
            return state;
    }
}


export default holdingReducer;
