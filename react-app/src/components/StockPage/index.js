import React from 'react';
import { useParams } from 'react-router-dom'
import StockGraph from '../StockGraph';
import "./StockPage.css"


function StockPage() {
    const { ticker } = useParams();

    return (
        <>
            <h1>I'm working!!</h1>
            <div className="stock__graph">
                <StockGraph ticker={ticker} />
            </div>
            
        </>
    )
}

export default StockPage
