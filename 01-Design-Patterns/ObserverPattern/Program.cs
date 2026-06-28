StockMarket stockMarket = new StockMarket();

IObserver mobile = new MobileApp();
IObserver web = new WebApp();

stockMarket.RegisterObserver(mobile);
stockMarket.RegisterObserver(web);

stockMarket.SetStock("TCS", 3560.75);