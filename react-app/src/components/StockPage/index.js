import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getStockInfo } from "../../store/stocks"
import StockGraph from '../StockGraph';
import BuyForm from "../OrderForms/BuyForm"
import CompanyInfo from "../CompanyInfo"
import "./StockPage.css"


function StockPage() {
    const { ticker } = useParams();
    const dispatch = useDispatch();
    const stock = useSelector(state => state.stocks[ticker]);



    useEffect(() => {
        async function getStock() {
            await dispatch(getStockInfo(ticker));
        }
        getStock();
    }, [dispatch, ticker])

    return (
        <div className="stock-page-container">
            <div className="stock-page__left-side">
                <div className="stock__info">
                    <span>{ticker}</span>
                    <span>{stock && `$${stock.quote.c.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}</span>
                </div>
                <div className="stock__graph">
                    <StockGraph ticker={ticker} />
                </div>
                <div className="company__info">
                    <CompanyInfo stock={stock} />
                </div>
            </div>
            <div className="transaction-form">
                <BuyForm stock={stock} />
            </div>
        </div>
    )
}

export default StockPage
