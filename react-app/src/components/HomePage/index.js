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




    return (
        <div className="main-content">
            <div className="main-content__left-side">
                <div className="main-content__holdings-info">
                    <span>{holdingsArr && getTotalValue(holdingsArr)}</span>
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
