const LOAD_HOLDINGS = "holdings/LOAD"
const LOAD_HOLDING = "holding/LOAD"

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

export const getHoldings = () => async (dispatch) => {
    const response = await fetch(`/api/holdings/`);

    if (response.ok) {
        const data = await response.json();
        dispatch(load(data.holdings));
        return data;
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
        default:
            return state;
    }
}


export default holdingReducer;
