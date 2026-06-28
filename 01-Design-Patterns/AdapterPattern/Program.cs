PaymentProcessor paypal = new PayPalAdapter(new PayPalGateway());
paypal.ProcessPayment(5000);

PaymentProcessor stripe = new StripeAdapter(new StripeGateway());
stripe.ProcessPayment(7500);