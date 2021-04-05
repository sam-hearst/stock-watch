import React, { useState, useEffect } from "react"
import LogoutButton from "../auth/LogoutButton"

function AccountButton({ setAuthenticated }) {
    const [showDropDown, SetShowDropDown] = useState(false)

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
            <div onClick={handleClick}>Account</div>
            {showDropDown && (
                <div className="dropdown-container">
                    <div className="dropdown-container__account">
                        <div>
                            <i className="fas fa-briefcase"></i>
                        </div>
                        <div>Account</div>
                    </div>
                    <div className="dropdown-container__sign-out">
                        <div>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                        <LogoutButton setAuthenticated={setAuthenticated} />
                    </div>
                </div>
            )}
        </>
    )

}


export default AccountButton
