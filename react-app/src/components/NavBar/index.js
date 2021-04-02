import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar'
import AccountButton from "./AccountButton"
import "./NavBar.css"

const NavBar = ({ setAuthenticated }) => {
    return (
        <nav>
            <div className="nav-container">
                <div>
                    <NavLink to="/" exact={true} activeClassName="active">
                        <div>
                            <i className="fas fa-binoculars"></i>
                        </div>
                    </NavLink>
                </div>
                <div>
                    <SearchBar />
                </div>
                <div>
                    Portfolio
                </div>
                <div>
                    <AccountButton setAuthenticated={setAuthenticated}/>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
