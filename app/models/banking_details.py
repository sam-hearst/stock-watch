from .db import db
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship


class Banking_Details(db.Model):
    __tablename__ = "banking_details"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    bank_name = db.Column(db.String(300), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    account_number = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="banking_details")

    def to_dict(self):

        return {
            "id": self.id,
            "user_id": self.user_id,
            "bank_name": self.bank_name,
            "username": self.username,
            "account_number": self.account_number
        }
