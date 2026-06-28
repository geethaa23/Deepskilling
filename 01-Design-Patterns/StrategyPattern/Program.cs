PaymentContext context = new PaymentContext(new CreditCardPayment());

context.ExecutePayment(1500);

context.SetStrategy(new PayPalPayment());

context.ExecutePayment(2500);