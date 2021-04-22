import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getStockInfo } from "../../store/stocks"
import { getHoldings } from "../../store/holdings"
import StockGraph from '../StockGraph';
import BuyForm from "../OrderForms/BuyForm"
import CompanyInfo from "../CompanyInfo"
import "./StockPage.css"


function StockPage() {
    const { ticker } = useParams();
    const dispatch = useDispatch();
    const stock = useSelector(state => state.stocks[ticker]);
    const holdings = useSelector(state => state.holdings);
    const isHolding = holdings[stock?.id] ? true : false

    // THIS LOGIC IS PASSED INTO BUY AND SELL FORM TO DETERMINE IF ITS AN UPDATE OR DELETE ROUTE
    const totalShares = holdings[stock?.id]?.stock_details[0].num_of_shares

    function roundTo(n, digits) {
        var negative = false;
        if (digits === undefined) {
            digits = 0;
        }
        if (n < 0) {
            negative = true;
            n = n * -1;
        }
        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        n = (Math.round(n) / multiplicator).toFixed(digits);
        if (negative) {
            n = (n * -1).toFixed(digits);
        }
        return n;
    }

    function percChangeToday(currentPrice, openPrice) {
        const percentChange = ((currentPrice - openPrice) / openPrice) * 100

        if (percentChange > 0) {
            return `(+${percentChange.toFixed(2)}%)  `
        } else {
            return `(${percentChange.toFixed(2)}%)  `
        }
    }

    function returnToday(currentPrice, openPrice) {
        const diff = currentPrice - openPrice

        if (diff > 0) {
            return `+$${roundTo(diff, 2)}  `
        } else {
            return `-$${Math.abs(roundTo(diff, 2))}  `
        }
    }


    useEffect(() => {
        async function getStock() {
            await dispatch(getStockInfo(ticker));
        }
        getStock();

        async function fetchHoldings() {
            await dispatch(getHoldings())
        }
        fetchHoldings();
    }, [dispatch, ticker])


    if (!stock) {
        return null
    }

    return stock && (
        <div className="stock-page-container">
            <div className="stock-page__left-side">
                <div className="stock__info">
                    <span>{ticker}</span>
                    <span>{stock && `$${stock.quote.c.toLocaleString(undefined, { FractionDigits: 2 })}`}</span>
                    <div className="stock-info__daily">
                        <span>{returnToday(stock?.quote.c, stock?.quote.o)}</span>
                        <span>{percChangeToday(stock?.quote.c, stock?.quote.o)}</span>
                        <span id="today">Today</span>
                    </div>

                </div>
                <div className="stock__graph">
                    <StockGraph ticker={ticker} />
                </div>
                <div className="company__info">
                    <CompanyInfo stock={stock} />
                </div>
            </div>
            <div className="transaction-form">
                <BuyForm totalShares={totalShares} isHolding={isHolding} stock={stock} />
            </div>
        </div>
    )
}

export default StockPage
