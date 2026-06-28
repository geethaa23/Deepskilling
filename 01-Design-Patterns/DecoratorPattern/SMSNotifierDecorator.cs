public class SMSNotifierDecorator : NotifierDecorator
{
    public SMSNotifierDecorator(INotifier notifier) : base(notifier)
    {
    }

    public override void Send()
    {
        base.Send();
        Console.WriteLine("Sending SMS Notification");
    }
}