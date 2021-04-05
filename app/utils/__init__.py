import finnhub
import os
import requests
import time


def get_data_pts(tickers, shares):
    timestamp = int(time.time())  # unix timestamp
    finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY_TOO"))

    lst = []

    for i in range(len(tickers)):
        ticker = tickers[i]
        num_shares_ticker = shares[i]
        res = finnhub_client.stock_candles(
            ticker, 'W', timestamp-5184000, timestamp)
        close_prices = res["c"]
        data = [close_price*num_shares_ticker for close_price in close_prices]
        lst.append(data)

    added_arr = map(sum, zip(*lst))
    return list(added_arr)
