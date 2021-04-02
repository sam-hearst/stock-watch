from app.models import db, Stock


def seed_stocks():

    apple = Stock(company_name="Apple", stock_ticker="AAPL",
                  company_info="""Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other variety of related services. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific. The Americas segment includes North and South America. The Europe segment consists of European countries, as well as India, the Middle East, and Africa. The Greater China segment comprises of China, Hong Kong, and Taiwan. The Rest of Asia Pacific segment includes Australia and Asian countries. Its products and services include iPhone, Mac, iPad, AirPods, Apple TV, Apple Watch, Beats products, Apple Care, iCloud, digital content stores, streaming, and licensing services. The company was founded by Steven Paul Jobs, Ronald Gerald Wayne, and Stephen G. Wozniak in 1977 and is headquartered in Cupertino, CA. The listed name for AAPL is Apple Inc. Common Stock.""")

    google = Stock(company_name="Google", stock_ticker="GOOG",
                   company_info="Alphabet Inc. Class C Capital Stock, also called Alphabet Class C, is a holding company, which engages in the business of acquisition and operation of different companies. It operates through the Google and Other Bets segments. The Google segment includes its main Internet products such as ads, Android, Chrome, hardware, Google Cloud, Google Maps, Google Play, Search, and YouTube. The Other Bets segment consists of businesses such as Access, Calico, CapitalG, GV, Verily, Waymo, and X. The company was founded by Lawrence E. Page and Sergey Mikhaylovich Brin on October 2, 2015 and is headquartered in Mountain View, CA. The listed name for GOOG is Alphabet Inc. Class C Capital Stock.")

    netflix = Stock(company_name="Netflix", stock_ticker="NFLX",
                    company_info="Netflix, Inc. operates as a streaming entertainment service company. The firm provides subscription service streaming movies and television episodes over the Internet and sending DVDs by mail. It operates through the following segments: Domestic Streaming, International Streaming and Domestic DVD. The Domestic Streaming segment derives revenues from monthly membership fees for services consisting of streaming content to its members in the United States. The International Streaming segment includes fees from members outside the United States. The Domestic DVD segment covers revenues from services consisting of DVD-by-mail. The company was founded by Marc Randolph and Wilmot Reed Hastings Jr. on August 29, 1997 and is headquartered in Los Gatos, CA. The listed name for NFLX is Netflix, Inc. Common Stock.")

    db.session.add(apple)
    db.session.add(google)
    db.session.add(netflix)

    db.session.commit()


def undo_stocks():
    db.session.execute("TRUNCATE stocks CASCADE;")
    db.session.commit()
