import React from "react"
import "./AddBAccountModal.css"

const Modal = props => {

    if (!props.show) {
        return null
    }

    async function handleSubmit(e) {
        e.preventDefault();

        return
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
                                <select>
                                    <option>something</option>
                                </select>
                            </div>
                            <div>
                                <label>Bank</label>
                                <select>
                                    <option></option>
                                </select>
                            </div>
                            <div>
                                <label>Username</label>
                                <input></input>
                            </div>
                            <div>
                                <label>Account Password</label>
                                <input></input>
                            </div>
                            <div>
                                <label>Account Number</label>
                                <input></input>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="button">Close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal
