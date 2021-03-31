from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Stock_Details, Stock

holding_routes = Blueprint("holdings", __name__)

@holding_routes.route('/')
@login_required
def holdings():
    if current_user.is_authenticated:
        current_user_dict = current_user.to_dict()
        print('CURRENT USER!!!!', current_user_dict)
        holdings = Stock.query.join(Stock_Details).filter(
            Stock_Details.user_id == current_user_dict["id"])

    return {"holdings": [holding.to_dict() for holding in holdings]}
