from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def update_user(id):

    data = request.json

    user = User.query.get(id)

    transfer_amount = float((data["transferAmount"]))

    # check to see if transfering money out of or into tech-watch account
    if data["toAccount"] == "tech-watch":
        user.buying_power += transfer_amount
    else:
        user.buying_power -= transfer_amount

    db.session.add(user)
    db.session.commit()

    return {"user": user.to_dict()}
