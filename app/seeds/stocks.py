from app.models import db, Stock


def seed_stocks():

    apple = Stock(company_name="Apple", stock_ticker="AAPL",
                  company_info="""Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other variety of related services. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific. The Americas segment includes North and South America. The Europe segment consists of European countries, as well as India, the Middle East, and Africa. The Greater China segment comprises of China, Hong Kong, and Taiwan. The Rest of Asia Pacific segment includes Australia and Asian countries. Its products and services include iPhone, Mac, iPad, AirPods, Apple TV, Apple Watch, Beats products, Apple Care, iCloud, digital content stores, streaming, and licensing services. The company was founded by Steven Paul Jobs, Ronald Gerald Wayne, and Stephen G. Wozniak in 1977 and is headquartered in Cupertino, CA. The listed name for AAPL is Apple Inc. Common Stock.""")

    google = Stock(company_name="Google", stock_ticker="GOOG",
                   company_info="Alphabet Inc. Class C Capital Stock, also called Alphabet Class C, is a holding company, which engages in the business of acquisition and operation of different companies. It operates through the Google and Other Bets segments. The Google segment includes its main Internet products such as ads, Android, Chrome, hardware, Google Cloud, Google Maps, Google Play, Search, and YouTube. The Other Bets segment consists of businesses such as Access, Calico, CapitalG, GV, Verily, Waymo, and X. The company was founded by Lawrence E. Page and Sergey Mikhaylovich Brin on October 2, 2015 and is headquartered in Mountain View, CA. The listed name for GOOG is Alphabet Inc. Class C Capital Stock.")

    netflix = Stock(company_name="Netflix", stock_ticker="NFLX",
                    company_info="Netflix, Inc. operates as a streaming entertainment service company. The firm provides subscription service streaming movies and television episodes over the Internet and sending DVDs by mail. It operates through the following segments: Domestic Streaming, International Streaming and Domestic DVD. The Domestic Streaming segment derives revenues from monthly membership fees for services consisting of streaming content to its members in the United States. The International Streaming segment includes fees from members outside the United States. The Domestic DVD segment covers revenues from services consisting of DVD-by-mail. The company was founded by Marc Randolph and Wilmot Reed Hastings Jr. on August 29, 1997 and is headquartered in Los Gatos, CA. The listed name for NFLX is Netflix, Inc. Common Stock.")

    amazon = Stock(company_name="Amazon", stock_ticker="AMZN",
                   company_info="Amazon.com, Inc. engages in the provision of online retail shopping services. It operates through the following business segments: North America, International, and Amazon Web Services (AWS). The North America segment includes retail sales of consumer products and subscriptions through North America-focused websites such as www.amazon.com and www.amazon.ca. The International segment offers retail sales of consumer products and subscriptions through internationally-focused websites. The Amazon Web Services segment involves in the global sales of compute, storage, database, and AWS service offerings for start-ups, enterprises, government agencies, and academic institutions. The company was founded by Jeffrey P. Bezos in July 1994 and is headquartered in Seattle, WA. The listed name for AMZN is Amazon.com, Inc. Common Stock.")

    microsoft = Stock(company_name="Microsoft", stock_ticker="MSFT",
                      company_info="Microsoft Corp. engages in the development and support of software, services, devices, and solutions. It operates through the following business segments: Productivity and Business Processes; Intelligent Cloud; and More Personal Computing. The Productivity and Business Processes segment comprises products and services in the portfolio of productivity, communication, and information services of the company spanning a variety of devices and platform. The Intelligent Cloud segment refers to the public, private, and hybrid serve products and cloud services of the company which can power modern business. The More Personal Computing segment encompasses products and services geared towards the interests of end users, developers, and IT professionals across all devices. The firm also offers operating systems; cross-device productivity applications; server applications; business solution applications; desktop and server management tools; software development tools; video games; personal computers, tablets; gaming and entertainment consoles; other intelligent devices; and related accessories. The company was founded by Paul Gardner Allen and William Henry Gates III in 1975 and is headquartered in Redmond, WA. The listed name for MSFT is Microsoft Corporation Common Stock.")

    amc = Stock(company_name="AMC", stock_ticker="AMC",
                company_info="AMC Entertainment Holdings, Inc. engages in the theatrical exhibition business through its subsidiaries. It operates through the United States Markets and International Markets segments. The United States segment involves in the activity in the U.S. specifically in New York, Los Angeles, Chicago, Atlanta, and Washington, D.C.. The International Markets segment focuses its operations in the United Kingdom, Germany, Spain, Italy, Ireland, Portugal, Sweden, Finland, Estonia, Latvia, Lithuania, Norway, and Denmark. The company was founded by Barney Dubinsky, Maurice Durwood and Edward Durwood in 1920 and is headquartered in Leawood, KS. The listed name for AMC is AMC ENTERTAINMENT HOLDINGS, INC.")


    db.session.add(apple)
    db.session.add(google)
    db.session.add(netflix)
    db.session.add(amazon)
    db.session.add(microsoft)
    db.session.add(amc)

    db.session.commit()


def undo_stocks():
    db.session.execute("TRUNCATE stocks CASCADE;")
    db.session.commit()
