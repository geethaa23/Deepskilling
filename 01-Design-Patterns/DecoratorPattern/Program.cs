INotifier notifier = new EmailNotifier();

notifier = new SMSNotifierDecorator(notifier);
notifier = new SlackNotifierDecorator(notifier);

notifier.Send();