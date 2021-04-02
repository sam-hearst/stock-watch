import React from "react";
import Portfolio from "../Portfolio"
import HoldingsGraph from "../HoldingsGraph"
import "./HomePage.css"
import { useSelector } from "react-redux";

function HomePage() {
    const user = useSelector(state => state.session);




    return (
        <div className="main-content">
            <div className="holdings-graph">
                <HoldingsGraph user={user}/>
            </div>
            <div className="portfolio">
                <Portfolio />
            </div>
        </div>
    )
}

export default HomePage;
