import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBDetails } from "../../store/banking_details";
import "./DepositFundsPage.css"


function DepositFundsPage() {
    const dispatch = useDispatch();
    const [ fromAccount, setFromAccount ] = useState('default')
    const [ toAccount, setToAccount ] = useState('default');
    const sessionUser = useSelector(state => state.session.user);
    const bDetails = useSelector(state => state.banking_details);
    const bDetailsArr = Object.values(bDetails);

    console.log(bDetails);

    async function handleSubmit() {
        return `working doeee`;

    }

    function convertAccountNumber(accountNumber) {
        return `••••${accountNumber.toString().slice(-4)}`;
    }


    useEffect(() => {
        async function getBankingInfo() {
            await dispatch(getBDetails())

        }
        getBankingInfo();
    }, [dispatch]);


    return (
        <div className="banking-container">
            <div className="banking__heading">
                <span>{`${sessionUser.first_name} ${sessionUser.last_name}`}</span>
            </div>
            <div className="banking-transfer-container">
                <div className="banking__accounts">
                    <div className="banking__accounts-heading">
                        <p>Linked Accounts</p>
                    </div>
                    <div className="accounts">
                        {bDetailsArr && bDetailsArr.map((account) => {
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
                                        <button>Remove</button>
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                    <div className="add-account-container">
                        <button>Add New Account</button>
                    </div>
                </div>
                <div className="transfer-funds-container">
                    <form onSubmit={handleSubmit}>
                        <div className="transfer-form__title">
                            <span>
                                Transfer
                            </span>
                        </div>
                        <div className="transfer-form__content">
                            <div className="transfer-form__from">
                                <span>From</span>
                                <select className="transfer-form__dropdown"
                                    value={fromAccount}
                                    onChange={(e) => setFromAccount(e.target.value)}
                                >
                                    <option value="">--Choose account--</option>
                                    <option>Robinhood (This Account)</option>
                                    {bDetailsArr && bDetailsArr.map((account, i) => (
                                        <option key={i}>
                                            {`${account.account_type ? `Savings at ${account.bank_name}` : `Checking at ${account.bank_name}`}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="transfer-form__to">
                                <span>To</span>
                                <select className="transfer-form__dropdown"
                                    value={toAccount}
                                    onChange={(e) => setToAccount(e.target.value)}
                                >
                                    <option value="">--Choose account--</option>
                                    <option>Robinhood (This Account)</option>
                                    {bDetailsArr && bDetailsArr.map((account, i) => (
                                        <option key={i}>
                                            {`${account.account_type ? `Savings at ${account.bank_name}` : `Checking at ${account.bank_name}`}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="transfer-form__amount">
                                <label htmlFor="shares">Amount</label>
                                <input
                                    name="shares"
                                    type="text"
                                    placeholder="$0.00"
                                />
                            </div>
                            <div className="transfer-form__submit">
                                <button type="submit">Submit Transfer</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DepositFundsPage
