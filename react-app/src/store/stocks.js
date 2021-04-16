const LOAD_STOCK = "stock/load"
const ADD_STOCK = "stock/add"



export const loadOneStock = (stock) => {
    return {
        type: LOAD_STOCK,
        stock
    }
}

// const addOneStock = (stock) => {
//     return {
//         type: ADD_STOCK,
//         payload: stock
//     }
// }


export const getStockInfo = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/stocks/info/${ticker}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadOneStock(data.stock));
        return data
    }
}

export const createStock = (payload) => async (dispatch) => {
    console.log("Hitting create stock THUNK", payload);
    const response = await fetch(`/api/stocks/${payload.stockTicker}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    })

    if (!response.ok) throw response;
    const data = await response.json();
    console.log("data got back from fetch",  data);
    // dispatch(addOneStock(data.stock));
    return data.stock
}



const initialState = {}

const stockReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_STOCK:
            newState = {}
            newState[action.stock.stocker_ticker] = action.stock
            return newState;
        case ADD_STOCK: {
            newState = Object.assign({}, { [action.payload.id]: action.payload })

            return newState;
        }
        default:
            return state;
    }
}

export default stockReducer
