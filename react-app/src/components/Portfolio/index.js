import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getHoldings } from '../../store/holdings';
import "./Portfolio.css"


function Portfolio() {
    const dispatch = useDispatch()
    const holdings = useSelector((state) => {
        return state.holdings
    });


    useEffect(() => {
        async function getPortfolio() {
            await dispatch(getHoldings());
        }
        getPortfolio();

    }, [dispatch])

    function dailyReturn(currentPrice, openingPrice) {
        const percentChange = ((currentPrice - openingPrice) / openingPrice) * 100

        if (percentChange > 0) {
            return `+${percentChange.toFixed(2)}%`
        } else {
            return `${percentChange.toFixed(2)}%`
        }
    }

    function positiveOrNegative(currentPrice, openingPrice) {
        const percentChange = ((currentPrice - openingPrice) / openingPrice) * 100

        if (percentChange > 0) {
            return 1
        } else {
            return -1
        }
    }

    const portfolioArr = Object.values(holdings);


    return (
        <>
            <div className="portfolio-container">
                <div className="portfolio-title">
                    <div>My holdings</div>
                    <div>
                        <i className="fas fa-cog"></i>
                    </div>
                </div>
                <div className="holdings-container">
                    {portfolioArr.map((holding) => {
                        return (
                            <div key={holding.id}  className="holding-container">
                                <Link to={`/stocks/${holding.stocker_ticker}`}>
                                    <div className="holding-container__left-side">
                                        <div>
                                            {holding.stocker_ticker}
                                        </div>
                                        <div>
                                            {`${holding.stock_details[0].num_of_shares} shares`}
                                        </div>
                                    </div>
                                    <div className="holding-container__right-side">
                                        <div>
                                            {`$${(holding.quote.c).toFixed(2)}`}
                                        </div>
                                        <div className="right-side__daily-return" id={positiveOrNegative(holding.quote.c, holding.quote.o) > 0 ? "green" : "red"}>
                                            {dailyReturn(holding.quote.c, holding.quote.o)}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}


export default Portfolio
