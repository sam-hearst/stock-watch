import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { buyHolding, updateHolding } from "../../../store/holdings"
import { createStock } from "../../../store/stocks"
import SellForm from "../SellForm"
import "../OrderForms.css"

function BuyForm({ totalShares, isHolding, stock }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { ticker } = useParams();
    const [numShares, setNumShares] = useState(0);
    const [ ShowSellForm, setShowSellForm] = useState(false)
    const sessionUser = useSelector(state => state.session.user)

    const estimatedCost = (quote, numShares) => {
        return `$${(quote*numShares).toFixed(2)}`
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload;

        if (stock.id) {
            payload = {
                stockTicker: ticker,
                stockId: stock.id,
                userId: sessionUser.id,
                numShares: Number(numShares),
                buyPrice: stock.quote.c,
                totalCost: Number(numShares) * stock.quote.c
            }

        } else if (!stock.id) {
            payload = {
                stockTicker: ticker,
                userId: sessionUser.id,
                numShares: Number(numShares),
                buyPrice: stock.quote.c,
                totalCost: Number(numShares) * stock.quote.c,
                company_name: stock.company_name,
                company_info: stock.company_info,
            }

            const newStock = await dispatch(createStock(payload))

            payload = { ...payload, stockId: newStock.id }
        }

        console.log("payload after seeded", payload)

        // These if statements check if the stock is already a holding and use different route if is or not
        if (isHolding) {
            await dispatch(updateHolding(payload));
        } else {
            console.log("Im hitting here!!")
            await dispatch(buyHolding(payload));
        }

        setNumShares(0)

        history.push("/");
    }

    if (ShowSellForm) {
        return (
            <SellForm totalShares={totalShares} isHolding={isHolding} stock={stock}/>
        )
    }

    return !ShowSellForm && (
        <div className="order-form-container">
            <form onSubmit={handleSubmit}>
                <div className="order-form__title">
                    <span id="order-form__buy-switch"
                        className="order-form__switch-selected"
                    >
                        Buy {ticker}</span>
                    {isHolding && (
                        <span id="order-form__sell-switch"
                            onClick={() => setShowSellForm(true)}
                        >Sell {ticker}</span>
                    )}
                </div>
                <div className="order-form__content">
                    <div className="order-form__shares">
                        <label htmlFor="shares">Shares</label>
                        <input
                            name="shares"
                            type="text"
                            placeholder="0"
                            value={numShares}
                            onChange={(e) => setNumShares(e.target.value)}
                        />
                    </div>
                    <div className="order-form__quote">
                        <span>Market Price</span>
                        <span>{`$${(stock?.quote.c)?.toFixed(2)}`}</span>
                    </div>
                    <div className="order-form__est-cost">
                        <span>Estimated Cost</span>
                        <span>{estimatedCost(stock?.quote.c, numShares)}</span>
                    </div>
                    <div className="order-form__submit">
                        <button type="submit">Submit Order</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BuyForm
