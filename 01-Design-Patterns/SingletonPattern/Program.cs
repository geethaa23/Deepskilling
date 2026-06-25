Logger logger1 = Logger.GetInstance();
Logger logger2 = Logger.GetInstance();

logger1.Log("First log message");
logger2.Log("Second log message");

if (logger1 == logger2)
{
    Console.WriteLine("Only one Logger instance exists.");
}
else
{
    Console.WriteLine("Multiple Logger instances exist.");
}