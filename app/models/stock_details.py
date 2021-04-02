from .db import db
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship
import finnhub
import os
import requests


class Stock_Details(db.Model):
    __tablename__: "stock_details"

    id = db.Column(db.Integer, primary_key=True)
    stock_id = db.Column(db.Integer, ForeignKey("stocks.id"), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    date_bought = db.Column(db.Date, nullable=False)
    buy_price = db.Column(db.Float, nullable=False)
    num_of_shares = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="stock_details")
    stock = db.relationship("Stock", back_populates="stock_details")

    def to_dict(self):
        return {
            "id": self.id,
            "stock_id": self.stock_id,
            "user_id": self.user_id,
            "date_bought": self.date_bought,
            "buy_price": self.buy_price,
            "num_of_shares": self.num_of_shares,
        }
