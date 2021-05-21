import React from "react"
import { useDispatch } from "react-redux"
import { deleteBDetail } from "../../../store/banking_details";



function BankAccount({ account }) {
    const dispatch = useDispatch()

    function convertAccountNumber(accountNumber) {
        return `••••${accountNumber.toString().slice(-4)}`;
    }

    async function handleRemove(e) {
        e.preventDefault();

        const result = window.confirm("Are you sure you want to unlink this account?");

        const payload = { accountId: account.id }

        if (result) {
            await dispatch(deleteBDetail(payload))
        }
    }

    return (
        <div key={account.id} className="banking-account">
            <div className="banking-img">
                <div id="icon-card">
                    <i className="fas fa-credit-card"></i>
                </div>
            </div>
            <div className="banking-account__info">
                <span>Regular {account.account_type ? "Savings" : "Checking"} at {account.bank_name}</span>
                <span>Savings {convertAccountNumber(account.account_number)}</span>
            </div>
            <div className="banking-account__remove">
                <button onClick={handleRemove}>Remove</button>
            </div>
        </div>
    )
}

export default BankAccount
