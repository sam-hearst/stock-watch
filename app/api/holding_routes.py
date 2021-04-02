from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Stock_Details, Stock
from app.utils import get_data_pts
import finnhub
import os
import requests
import time

holding_routes = Blueprint("holdings", __name__)


@holding_routes.route('/')
@login_required
def holdings():
    if current_user.is_authenticated:
        current_user_dict = current_user.to_dict()
        holdings = Stock.query.join(Stock_Details).filter(
            Stock_Details.user_id == current_user_dict["id"])

    return {"holdings": [holding.to_dict() for holding in holdings]}


@holding_routes.route('/<int:user_id>')
def holding_ticks(user_id):
    holdings = Stock.query.join(Stock_Details).filter(
        Stock_Details.user_id == user_id)

    holdings = [holding.to_dict() for holding in holdings]
    tickers = [holding["stocker_ticker"] for holding in holdings]
    num_shares = [holding["stock_details"][0]["num_of_shares"] for holding in holdings]
    data = get_data_pts(tickers, num_shares)
    right_data = [round(data_pt, 2) for data_pt in data]

    return {"data": right_data}
