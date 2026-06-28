double currentValue = 10000;
double growthRate = 0.10;   // 10%
int years = 5;

double futureValue = FinancialForecast.PredictFutureValue(currentValue, growthRate, years);

Console.WriteLine($"Current Value : ₹{currentValue}");
Console.WriteLine($"Growth Rate   : {growthRate * 100}%");
Console.WriteLine($"Years         : {years}");
Console.WriteLine($"Future Value  : ₹{futureValue:F2}");