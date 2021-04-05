import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar'
import AccountButton from "./AccountButton"
import "./NavBar.css"

const NavBar = ({ setAuthenticated }) => {
    return (
        <nav>
            <div className="nav-container">
                <div className="nav-container__left-side">
                    <div className="nav-container__main-icon">
                        <NavLink to="/" exact={true} activeClassName="active">
                            <div>
                                <i className="fas fa-binoculars"></i>
                            </div>
                        </NavLink>
                    </div>
                    <div className="nav-container__searchbar">
                        <SearchBar />
                    </div>
                </div>
                <div className="nav-container__right-side">
                    <div className="nav-container__portfolio">
                        <NavLink to="/">
                            <span>Portfolio</span>
                        </NavLink>
                    </div>
                    <div className="nav-container__account">
                        <AccountButton setAuthenticated={setAuthenticated} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
