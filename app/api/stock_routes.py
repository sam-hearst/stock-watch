import finnhub
import os
import requests
import time
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Stock_Details, Stock

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

    # if not stock:
    #     stock()

    return {"stock": stock.to_dict()}
