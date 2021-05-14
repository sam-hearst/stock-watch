import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { logout } from "../../services/auth";

function AccountButton({ setAuthenticated }) {
    const history = useHistory();
    const [showDropDown, SetShowDropDown] = useState(false)
    const sessionUser = useSelector((state) => state.session.user);

    const onLogout = async (e) => {
        await logout();
        setAuthenticated(false);
    };

    function redirect() {
        return history.push("/account/banking/");
    }


    function handleClick() {
        SetShowDropDown(!showDropDown);
    }

    useEffect(() => {
        if (!showDropDown) return;

        const closeDropDown = () => {
            SetShowDropDown(false);
        };

        document.addEventListener("click", closeDropDown)

        return () => document.removeEventListener("click", closeDropDown);

    }, [showDropDown])

    return (
        <>
            <span onClick={handleClick}>Account</span>
            {showDropDown && (
                <div className="dropdown-container"
                >
                    <div className="dropdown-container__user">
                        <div>
                            <span>Hi {sessionUser?.first_name}!</span>
                        </div>
                    </div>
                    <div className="dropdown-container__account">
                        <div>
                            <i className="fas fa-briefcase"></i>
                        </div>
                        <div>Account</div>
                    </div>
                    <div className="dropdown-container__banking"
                        onClick={redirect}
                    >
                        <div>
                            <i className="fas fa-university"></i>
                        </div>
                        <div>Banking</div>
                    </div>
                    <div className="dropdown-container__sign-out"
                        onClick={onLogout}
                    >
                        <div>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                        <div>Logout</div>
                    </div>
                </div>
            )}
        </>
    )

}


export default AccountButton
