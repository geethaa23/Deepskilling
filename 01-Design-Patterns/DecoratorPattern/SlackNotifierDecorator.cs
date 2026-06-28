public class SlackNotifierDecorator : NotifierDecorator
{
    public SlackNotifierDecorator(INotifier notifier) : base(notifier)
    {
    }

    public override void Send()
    {
        base.Send();
        Console.WriteLine("Sending Slack Notification");
    }
}