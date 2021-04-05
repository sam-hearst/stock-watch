from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Stock_Details, Stock
from app.utils import get_data_pts
from datetime import date
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


@holding_routes.route("/", methods=["POST"])
def add_holding():

    data = request.json
    new_holding = Stock_Details(stock_id=data["stockId"],
                                user_id=data["userId"], date_bought=date.today(),
                                buy_price=data["buyPrice"], num_of_shares=data["numShares"])

    db.session.add(new_holding)
    db.session.commit()

    holding = Stock.query.get(data["stockId"])

    return {"holding": holding.to_dict()}
