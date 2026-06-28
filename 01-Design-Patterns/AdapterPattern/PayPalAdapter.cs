public class PayPalAdapter : PaymentProcessor
{
    private readonly PayPalGateway payPalGateway;

    public PayPalAdapter(PayPalGateway payPalGateway)
    {
        this.payPalGateway = payPalGateway;
    }

    public void ProcessPayment(double amount)
    {
        payPalGateway.SendPayment(amount);
    }
}