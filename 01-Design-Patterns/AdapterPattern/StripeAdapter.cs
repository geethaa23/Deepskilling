public class StripeAdapter : PaymentProcessor
{
    private readonly StripeGateway stripeGateway;

    public StripeAdapter(StripeGateway stripeGateway)
    {
        this.stripeGateway = stripeGateway;
    }

    public void ProcessPayment(double amount)
    {
        stripeGateway.MakePayment(amount);
    }
}