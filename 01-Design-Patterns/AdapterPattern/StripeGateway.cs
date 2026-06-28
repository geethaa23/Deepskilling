public class StripeGateway
{
    public void MakePayment(double amount)
    {
        Console.WriteLine($"Paid ₹{amount} using Stripe.");
    }
}