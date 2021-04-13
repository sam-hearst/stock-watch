from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Stock_Details, Stock
import finnhub
import os
import requests
import time

stock_routes = Blueprint("stocks", __name__)


@stock_routes.route("/<ticker>")
def get_graph(ticker):

    timestamp = int(time.time())  # unix timestamp
    finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY"))
    res = finnhub_client.stock_candles(
        ticker, 'W', timestamp-3456000, timestamp)

    return {"res": res}


@stock_routes.route("/info/<ticker>")
def get_stock(ticker):

    stock = Stock.query.filter_by(stock_ticker=ticker).first()

    if not stock:
        # if the stock is not seeded, then I use an API to get the information
        finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY"))

        url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-profile"

        querystring = {"symbol": ticker.upper(), "region": "US"}

        headers = {
            'x-rapidapi-key': os.environ.get("X_RAPID_API_KEY"),
            'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }

        response = requests.request("GET", url, headers=headers, params=querystring)

        obj = response.json()
        company_name = obj["price"]["shortName"]
        stock_ticker = ticker
        company_info = obj["assetProfile"]["longBusinessSummary"]
        quote = finnhub_client.quote(ticker.upper())

        stock = {
            "company_name": company_name,
            "stocker_ticker": stock_ticker,
            "company_info": company_info,
            "quote": quote,
            "stock_details": []
        }

        return {"stock": stock}

    else:
        return {"stock": stock.to_dict()}


@stock_routes.route("/<ticker>", methods=["POST"])
def create_stock(ticker):
    data = request.json

    print("Im working!!!!!")

    new_stock = Stock(company_name=data["company_name"], stock_ticker=data["stockTicker"],
                      company_info=data["company_info"])

    db.session.add(new_stock)
    db.session.commit()

    return {"stock": new_stock.to_dict()}
