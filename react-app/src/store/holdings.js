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
        console.log(data);
        dispatch(load(data));
        return data;
    }
}


const initialState = {}

const holdingReducer = (state = initialState, action) => {
    // let newState
    switch (action.type) {
        case LOAD_HOLDINGS:
            return {};
        default:
            return state;
    }
}


export default holdingReducer;
