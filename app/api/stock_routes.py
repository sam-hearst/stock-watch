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
    finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY_THREE"))
    res = finnhub_client.stock_candles(
        ticker, 'W', timestamp-7257600, timestamp)

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

        # ---------I am now using a different api, lol

        url = "https://seeking-alpha.p.rapidapi.com/symbols/get-profile"

        querystring = {"symbols": ticker.upper()}

        headers = {
            'x-rapidapi-key': os.environ.get("X_RAPID_API_KEY"),
            'x-rapidapi-host': "seeking-alpha.p.rapidapi.com"
        }

        response = requests.request("GET", url, headers=headers, params=querystring)

        obj = response.json()
        num_employees = obj["data"][0]["attributes"]["numberOfEmployees"]
        market_cap = obj["data"][0]["attributes"]["marketCap"]

        # --------- I am now using one different url

        url = "https://seeking-alpha.p.rapidapi.com/symbols/get-summary"

        querystring = {"symbols": ticker.upper()}

        headers = {
            'x-rapidapi-key': "4f0dccc3bamsh277c4cec155d3c9p1d0881jsn3ccd92ae98a8",
            'x-rapidapi-host': "seeking-alpha.p.rapidapi.com"
        }

        response = requests.request("GET", url, headers=headers, params=querystring)

        obj = response.json()
        print(obj)
        pe_ratio = obj["data"][0]["attributes"]["peRatioFwd"]
        dividend_yield = obj["data"][0]["attributes"]["divYield"]

        stock = {
            "company_name": company_name,
            "stocker_ticker": stock_ticker,
            "company_info": company_info,
            "quote": quote,
            "stock_details": [],
            "num_employees": num_employees,
            "market_cap": market_cap,
            "pe_ratio": pe_ratio,
            "dividend_yield": dividend_yield
        }

        return {"stock": stock}

    else:
        return {"stock": stock.to_dict()}


@stock_routes.route("/<ticker>", methods=["POST"])
def create_stock(ticker):
    data = request.json

    print("DATAAAAA", data)

    new_stock = Stock(company_name=data["company_name"], stock_ticker=data["stockTicker"],
                      company_info=data["company_info"], num_employees=data["num_employees"],
                      market_cap=data["market_cap"], pe_ratio=data["pe_ratio"],
                      dividend_yield=data["dividend_yield"])

    db.session.add(new_stock)
    db.session.commit()

    return {"stock": new_stock.to_dict()}
