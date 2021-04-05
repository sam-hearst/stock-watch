const LOAD_STOCK = "stock/load"



export const loadOneStock = (stock) => {
    return {
        type: LOAD_STOCK,
        stock
    }
}


export const getStockInfo = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/stocks/info/${ticker}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadOneStock(data.stock));
        return data
    }
}



const initialState = {}

const stockReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_STOCK:
            newState = {}
            newState[action.stock.stocker_ticker] = action.stock
            return newState;
        default:
            return state;
    }
}

export default stockReducer
