from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Stock_Details, Stock
from app.utils import get_data_pts
from app.utils import convert_holdings
from datetime import date
import datetime
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
        holdings_info = Stock_Details.query.filter(
            Stock_Details.user_id == current_user_dict["id"]).all()

        holdings_info_converted = [holding_info.to_dict()
                                   for holding_info in holdings_info]
        holdings = [holding_info.stock.to_dict()
                    for holding_info in holdings_info]

        converted = convert_holdings(holdings, holdings_info_converted)

    return {"holdings": converted}


@holding_routes.route('/<int:user_id>')
@login_required
def holding_ticks(user_id):
    holdings_info = Stock_Details.query.filter(
        Stock_Details.user_id == user_id).all()

    holdings_info_converted = [holding_info.to_dict()
                               for holding_info in holdings_info]
    holdings = [holding_info.stock.to_dict() for holding_info in holdings_info]

    converted_holdings = convert_holdings(holdings, holdings_info_converted)

    tickers = [converted_holding["stocker_ticker"] for
               converted_holding in converted_holdings]

    num_shares = [converted_holding["stock_details"][0]["num_of_shares"]
                  for converted_holding in converted_holdings]

    data = get_data_pts(tickers, num_shares)
    right_data = [round(data_pt, 2) for data_pt in data]

    return {"data": right_data}


@holding_routes.route("/<ticker>", methods=["POST"])
def add_holding(ticker):

    data = request.json
    user_id = data["userId"]

    print("DATAAA", data)

    user = User.query.get(data["userId"])

    user.buying_power -= data["totalCost"]

    new_holding = Stock_Details(stock_id=data["stockId"],
                                user_id=data["userId"], date_bought=date.today(),
                                buy_price=data["buyPrice"], num_of_shares=data["numShares"])

    db.session.add(user)
    db.session.add(new_holding)
    db.session.commit()

    standardized_new_holding = new_holding.stock.to_dict()

    standardized_new_holding["stock_details"] = [new_holding.to_dict()]

    print("NEW HOLDING", standardized_new_holding)

    return {"holding": standardized_new_holding,
            "user": user.to_dict()}


@holding_routes.route("/<ticker>", methods=["PATCH"])
def update_holding(ticker):

    data = request.json

    # CHECKING if this is buying or selling part of a holding
    # SELLING
    if "totalCredit" in data.keys():

        user = User.query.get(data["userId"])

        holding = Stock_Details.query.filter(
            Stock_Details.stock_id == data["stockId"]).filter(
                Stock_Details.user_id == data["userId"]).all()

        print("HOLDING", holding)

        holding[0].num_of_shares = holding[0].num_of_shares - data["numShares"]
        user.buying_power = user.buying_power + data["totalCredit"]

        db.session.add(holding[0])
        db.session.add(user)
        db.session.commit()

        updated_holding = holding[0].stock.to_dict()
        stock_details = holding[0].to_dict()

        print("UPDATED HOLDING", update_holding)
        print("STOCK_DETAILS", stock_details)

        return {"holding_details": stock_details,
                "user": user.to_dict()}

    # BUYING
    elif "totalCost" in data.keys():

        user = User.query.get(data["userId"])

        holding = Stock_Details.query.filter(
            Stock_Details.stock_id == data["stockId"]).filter(
                Stock_Details.user_id == data["userId"]).all()

        holding[0].num_of_shares = holding[0].num_of_shares + data["numShares"]

        user.buying_power = user.buying_power - data["totalCost"]

        db.session.add(holding[0])
        db.session.add(user)
        db.session.commit()

        updated_holding = holding[0].stock.to_dict()
        stock_details = holding[0].to_dict()

        return {"holding": stock_details,
                "user": user.to_dict()}


@holding_routes.route("/<ticker>", methods=["DELETE"])
def delete_holding(ticker):

    data = request.json
    stock_id = data["stockId"]
    user_id = data["userId"]

    holding = Stock_Details.query.filter(
        Stock_Details.stock_id == stock_id).filter(
        Stock_Details.user_id == user_id).all()

    stock = holding[0].stock.to_dict()

    print("STOCCKKKKK", stock)

    user = User.query.get(user_id)

    user.buying_power = user.buying_power + data["totalCredit"]

    db.session.add(user)
    db.session.delete(holding[0])
    db.session.commit()
    print("HOLDINGG", holding[0])

    return {"holding": stock,
            "user": user.to_dict()}
