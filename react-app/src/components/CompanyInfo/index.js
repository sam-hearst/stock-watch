import React from "react"
import "./CompanyInfo.css"


function CompanyInfo({ stock }) {

    const abbreviate_number = function (num, fixed) {
        if (num === null) { return null; } // terminate early
        if (num === 0) { return '0'; } // terminate early
        fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
        var b = (num).toPrecision(2).split("e"), // get power
            k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
            c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
            d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
            e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
        return e;
    }


    return (
        <div className="company-info-container">
            <div className="company-info__title">
                <span>About</span>
            </div>
            <div className="company-info__body">
                <span>{stock?.company_info}</span>
            </div>
            <div className="company-info__stats">
                <div className="company-info__employees">
                    <span className="company-stats__title">Employees</span>
                    <span>{(stock.num_employees).toLocaleString('en-US')}</span>
                </div>
                <div>
                    <span className="company-stats__title">Market Cap</span>
                    <span>{abbreviate_number((stock.market_cap), 0)}</span>
                </div>
                <div>
                    <span className="company-stats__title">Price-Earnings Ratio</span>
                    <span>{stock.pe_ratio ? stock.pe_ratio.toFixed(2) : `--`}</span>
                </div>
                <div>
                    <span className="company-stats__title">Dividend Yield</span>
                    <span>{stock.dividend_yield ? stock.dividend_yield.toFixed(2) : `--`}</span>
                </div>
            </div>
        </div>
    )
}

export default CompanyInfo
