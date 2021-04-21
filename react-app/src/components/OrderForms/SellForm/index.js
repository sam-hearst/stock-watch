import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { updateHolding, deleteHolding } from "../../../store/holdings"
import BuyForm from "../BuyForm"
import "../OrderForms.css"

function SellForm({ totalShares, isHolding, stock }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { ticker } = useParams();
    const [numShares, setNumShares] = useState(0);
    const [showBuyForm, setShowBuyForm] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const sessionUser = useSelector(state => state.session.user)
    const estimatedCost = (quote, numShares) => {
        return `$${(quote * numShares).toFixed(2)}`
    }

    function validate() {
        const validationErrors = []

        if (!numShares) {
            validationErrors.push('please enter a number greater than 0')
        }

        if (numShares > totalShares) {
            if (totalShares === 1) {
                validationErrors.push(`you can only sell up to ${totalShares} share of ${stock.stocker_ticker}`)
            } else {
                validationErrors.push(`you can only sell up to ${totalShares} shares of ${stock.stocker_ticker}`)
            }
        }

        return validationErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validate()

        if (errors.length > 0) {
            return setValidationErrors(errors);
        }

        const payload = {
            stockTicker: ticker,
            stockId: stock.id,
            userId: sessionUser.id,
            numShares: Number(numShares),
            sellPrice: stock.quote.c,
            totalCredit: Number(numShares) * stock.quote.c
        }

        if (isHolding) {
            // this if statement is checking to see if its a delete or update route
            if (payload.numShares === totalShares) {
                await dispatch(deleteHolding(payload))
            } else {
                await dispatch(updateHolding(payload));
            }
        }

        setNumShares(0)

        history.push("/");
    }

    if (showBuyForm) {
        return (
            <BuyForm totalShares={totalShares} isHolding={isHolding} stock={stock} />
        )
    }

    return !showBuyForm && (
        <div className="order-form-container">
            <form onSubmit={handleSubmit}>
                <div className="order-form__title">
                    <span id="order-form__buy-switch"
                        onClick={() => setShowBuyForm(true)}
                    >
                        Buy {ticker}</span>
                    <span id="order-form__sell-switch"
                        className="order-form__switch-selected"
                    >
                        Sell {ticker}</span>
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
                        <span>Estimated Credit</span>
                        <span>{estimatedCost(stock?.quote.c, numShares)}</span>
                    </div>
                    <div className="order-form__errors">
                        {validationErrors && validationErrors.map((error, idx) => {
                            return (
                                <div key={idx}>{error}</div>
                            )
                        })}
                    </div>
                    <div className="order-form__submit">
                        <button type="submit">Submit Order</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SellForm
