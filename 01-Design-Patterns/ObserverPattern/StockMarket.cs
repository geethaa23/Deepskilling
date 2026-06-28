using System.Collections.Generic;

public class StockMarket : IStock
{
    private List<IObserver> observers = new List<IObserver>();

    private string stockName = "";
    private double price;

    public void RegisterObserver(IObserver observer)
    {
        observers.Add(observer);
    }

    public void RemoveObserver(IObserver observer)
    {
        observers.Remove(observer);
    }

    public void SetStock(string name, double stockPrice)
    {
        stockName = name;
        price = stockPrice;
        NotifyObservers();
    }

    public void NotifyObservers()
    {
        foreach (var observer in observers)
        {
            observer.Update(stockName, price);
        }
    }
}