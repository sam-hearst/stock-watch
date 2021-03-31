from app.models import db, Stock


def seed_stocks():

    apple = Stock(company_name="Apple", stock_ticker="AAPL",
                  company_info="""Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other variety of related services. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific. The Americas segment includes North and South America. The Europe segment consists of European countries, as well as India, the Middle East, and Africa. The Greater China segment comprises of China, Hong Kong, and Taiwan. The Rest of Asia Pacific segment includes Australia and Asian countries. Its products and services include iPhone, Mac, iPad, AirPods, Apple TV, Apple Watch, Beats products, Apple Care, iCloud, digital content stores, streaming, and licensing services. The company was founded by Steven Paul Jobs, Ronald Gerald Wayne, and Stephen G. Wozniak in 1977 and is headquartered in Cupertino, CA. The listed name for AAPL is Apple Inc. Common Stock.""")

    db.session.add(apple)

    db.session.commit()


def undo_stocks():
    db.session.execute("TRUNCATE stocks CASCADE;")
    db.session.commit()
