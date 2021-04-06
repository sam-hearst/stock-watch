from datetime import date
from app.models import db, Stock_Details


def seed_stock_details():

    apple = Stock_Details(
        stock_id=1, user_id=1, date_bought=date.today(), buy_price=110.90, num_of_shares=8)
    google = Stock_Details(
        stock_id=2, user_id=1, date_bought=date.today(), buy_price=2050.58, num_of_shares=2)
    netflix = Stock_Details(
        stock_id=3, user_id=1, date_bought=date.today(), buy_price=533.70, num_of_shares=2)

    tesla = Stock_Details(
        stock_id=7, user_id=1, date_bought=date.today(), buy_price=692.20, num_of_shares=3)

    gamestop = Stock_Details(
        stock_id=8, user_id=1, date_bought=date.today(), buy_price=187.40, num_of_shares=4)

    db.session.add(apple)
    db.session.add(google)
    db.session.add(netflix)
    db.session.add(tesla)
    db.session.add(gamestop)
    db.session.commit()


def undo_stock_details():
    db.session.execute("TRUNCATE stock_details")
    db.session.commit()
