import React from "react"
import "./CompanyInfo.css"


function CompanyInfo({ stock }) {


    return (
        <div className="company-info-container">
            <div className="company-info__title">
                <span>About</span>
            </div>
            <div className="company-info__body">
                <span>{stock?.company_info}</span>
            </div>
        </div>
    )
}

export default CompanyInfo
