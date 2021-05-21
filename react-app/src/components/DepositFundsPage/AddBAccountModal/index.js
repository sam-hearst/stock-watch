import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createBDetail } from "../../../store/banking_details";
import "./AddBAccountModal.css"


const Modal = props => {
    const dispatch = useDispatch();
    const [accountType, setAccountType] = useState("default");
    const [bankName, setBankName] = useState('default');
    const [username, setUsername] = useState('');
    const [accountPassword, setAccountPassword] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    const bankNameArr = ["Bank of America", "Chase", "Capital One", "Citi", "Wells Fargo", "TD Bank",
        "Ally Bank", "Charles Schwab"]




    if (!props.show) {
        return null
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            accountType,
            bankName,
            username,
            accountPassword,
            accountNumber,
        }

        await dispatch(createBDetail(payload));

        setAccountType("default");
        setBankName("default");
        setUsername('');
        setAccountPassword('');
        setAccountNumber('');


        return props.onClose()
    }


    return (
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Link Bank Account</h4>
                </div>
                <div className="modal-body">
                    <div className="modal-subtitle">
                        <span>Enter your account information</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-content">
                            <div>
                                <label>Account Type</label>
                                <select
                                    value={accountType}
                                    onChange={(e) => (setAccountType(e.target.value))}
                                >
                                    <option value='default'>-- Select Account Type --&nbsp;</option>
                                    <option value={false}>Checking</option>
                                    <option value={true}>Savings</option>
                                </select>
                            </div>
                            <div>
                                <label>Bank</label>
                                <select
                                    value={bankName}
                                    onChange={(e) => (setBankName(e.target.value))}
                                >
                                    <option value="default">-- Select Your Bank --</option>
                                    {bankNameArr && bankNameArr.map((bankName, i) => {
                                        return (
                                            <option key={i} value={bankName}>{bankName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <label>Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => (setUsername(e.target.value))}
                                ></input>
                            </div>
                            <div>
                                <label>Account Password</label>
                                <input
                                    type="password"
                                    value={accountPassword}
                                    onChange={(e) => (setAccountPassword(e.target.value))}
                                ></input>
                            </div>
                            <div>
                                <label>Account Number</label>
                                <input
                                    type="text"
                                    value={accountNumber}
                                    onChange={(e) => (setAccountNumber(e.target.value))}
                                ></input>
                            </div>
                        </div>
                        <div className="add-account__button">
                            <button>Link Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal
