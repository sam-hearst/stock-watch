from app.models import db, Banking_Details


def seed_bank_details():

    boa = Banking_Details(user_id=1,
                          bank_name="Bank of America", username="demo.paul",
                          account_number=394006168976, account_type=True)

    boa_checking = Banking_Details(user_id=1,
                                   bank_name="Bank of America",
                                   username="demo.paul",
                                   account_number=394008083954,
                                   account_type=False)

    db.session.add(boa)
    db.session.add(boa_checking)
    db.session.commit()


def undo_bank_details():
    db.session.execute("TRUNCATE bank_details")
    db.session.commit()
