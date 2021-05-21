from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Stock_Details, Stock, Banking_Details

banking_routes = Blueprint("banking", __name__)


@banking_routes.route('/')
@login_required
def get_banking_info():

    if current_user.is_authenticated:
        current_user_dict = current_user.to_dict()

        banking_details = Banking_Details.query.filter(
            Stock_Details.user_id == current_user_dict["id"]).all()

        return {"banking_details": [banking_detail.to_dict() for
                                    banking_detail in banking_details]}


@banking_routes.route("/", methods=["POST"])
@login_required
def add_banking_info():

    data = request.json

    if current_user.is_authenticated:
        current_user_dict = current_user.to_dict()

        print(data)
        print(current_user_dict)

        user_id = current_user_dict["id"]
        bank_name = data["bankName"]
        username = data["username"]
        account_number = data["accountNumber"]
        account_type = True if data["accountType"] == "true" else False

        banking_detail = Banking_Details(user_id=user_id,
                                         bank_name=bank_name,
                                         username=username,
                                         account_number=account_number,
                                         account_type=account_type)

        db.session.add(banking_detail)
        db.session.commit()

        return {"banking_detail": banking_detail.to_dict()}


@banking_routes.route("/", methods=["DELETE"])
@login_required
def delete_b_detail():

    data = request.json

    if current_user.is_authenticated:
        current_user_dict = current_user.to_dict()

        banking_detail = Banking_Details.query.get(data["accountId"])

        print(banking_detail)

        db.session.delete(banking_detail)
        db.session.commit()

        return {"banking_detail": banking_detail.to_dict()}
