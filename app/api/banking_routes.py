from flask import Blueprint, jsonify, request
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
