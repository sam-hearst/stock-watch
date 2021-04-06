import React from "react"
import "./CompanyInfo.css"


function CompanyInfo({ stock }) {


    return (
        <div className="company-info-container">
            <div className="company-info__title">
                About
            </div>
            <div>
                {stock?.company_info}
            </div>
        </div>
    )
}

export default CompanyInfo
