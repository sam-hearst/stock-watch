import React from "react";
import Portfolio from "../Portfolio"
import HoldingsGraph from "../HoldingsGraph"
import "./HomePage.css"
import { useSelector } from "react-redux";

function HomePage() {
    const user = useSelector(state => state.session);
    const holdings = useSelector(state => state.holdings);

    const holdingsArr = Object.values(holdings);

    function getTotalValue(holdingsArr) {
        let total = 0

        for (let i = 0; i < holdingsArr.length; i++) {
            let holding = holdingsArr[i]
            let currentPrice = holding?.quote?.c
            let numShares = holding.stock_details[0].num_of_shares
            let totalInHolding = currentPrice*numShares
            total = total + totalInHolding
        }
        return `$${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    }

    function totalPercentChange(holdingsArr) {
        let finalValue = 0;
        let initialValue = 0;

        for (let i = 0; i < holdingsArr.length; i++) {
            let holding = holdingsArr[i]
            let currentPrice = holding?.quote?.c
            let numShares = holding.stock_details[0].num_of_shares
            let totalInHolding = currentPrice * numShares
            finalValue = finalValue + totalInHolding
        }

        for (let i = 0; i < holdingsArr.length; i++) {
            let holding = holdingsArr[i];
            let buyPrice = holding.stock_details[0].buy_price
            let numShares = holding.stock_details[0].num_of_shares
            let initialHoldingValue = buyPrice * numShares
            initialValue = initialValue + initialHoldingValue
        }

        const percChange = ((finalValue - initialValue) / initialValue) * 100

        if (percChange > 0) {
            return `(+${percChange.toFixed(2)}%)`
        } else {
            return `(${percChange.toFixed(2)}%)`
        }

    }

    function totalDollorChange(holdingsArr) {
        let totalValue = 0;
        let initialValue = 0;

        for (let i = 0; i < holdingsArr.length; i++) {
            let holding = holdingsArr[i]
            let currentPrice = holding?.quote?.c
            let numShares = holding.stock_details[0].num_of_shares
            let totalInHolding = currentPrice * numShares
            totalValue = totalValue + totalInHolding
        }

        for (let i = 0; i < holdingsArr.length; i++) {
            let holding = holdingsArr[i];
            let buyPrice = holding.stock_details[0].buy_price
            let numShares = holding.stock_details[0].num_of_shares
            let initialHoldingValue = buyPrice*numShares
            initialValue = initialValue + initialHoldingValue
        }

        let totalDolChange = (totalValue - initialValue).toFixed(2);

        if (totalDolChange > 0) {
            return `+$${totalDolChange.toLocaleString(undefined, { maximumFractionDigits: 2 })}  `
        } else {
            return `-$${totalDolChange.toLocaleString(undefined, { maximumFractionDigits: 2 })}  `
        }
    }




    return (
        <div className="main-content">
            <div className="main-content__left-side">
                <div className="main-content__holdings-info">
                    <span>{holdingsArr && getTotalValue(holdingsArr)}</span>
                    <div className="main-content__return-info">
                        <span>{holdingsArr && totalDollorChange(holdingsArr)}</span>
                        <span>{holdingsArr && totalPercentChange(holdingsArr)}</span>
                        <span id="all-time">  All Time</span>
                    </div>
                </div>
                <div className="holdings-graph">
                    <HoldingsGraph user={user} />
                </div>
                <div className="main-content__buying-power">
                    <span>Buying Power</span>
                    <span>{`$${(user.user?.buying_power)?.toFixed(2)}`}</span>
                </div>
            </div>
            <div className="portfolio">
                <Portfolio />
            </div>
        </div>
    )
}

export default HomePage;
