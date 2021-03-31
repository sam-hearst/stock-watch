from datetime import date
from app.models import db, Stock_Details


def seed_stock_details():

    apple = Stock_Details(
        stock_id=1, user_id=1, date_bought=date.today(), buy_price=110.90, num_of_shares=8)

    db.session.add(apple)
    db.session.commit()


def undo_stock_details():
    db.session.execute("TRUNCATE stock_details")
    db.session.commit()
