from .db import db
from sqlalchemy.orm import relationship


class Stock(db.Model):
    __tablename__ = "stocks"

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100), nullable=False, unique=True)
    stock_ticker = db.Column(db.String(20), nullable=False, unique=True)
    company_info = db.Column(db.Text, nullable=False, unique=True)

    stock_details = db.relationship("Stock_Details", back_populates="stock")

    def to_dict(self):
        return {
            "id": self.id,
            "company_name": self.company_name,
            "stocker_ticker": self.stock_ticker,
            "company_info": self.company_info,
            "stock_details": [stock_detail.to_dict() for stock_detail in self.stock_details]
        }
