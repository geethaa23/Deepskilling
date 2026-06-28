Product[] products =
{
    new Product(101, "Laptop", 65000),
    new Product(102, "Mobile", 25000),
    new Product(103, "Keyboard", 1500),
    new Product(104, "Mouse", 800),
    new Product(105, "Monitor", 12000)
};

Console.WriteLine("Linear Search:");

Product? result = SearchService.LinearSearch(products, 103);

if (result != null)
    Console.WriteLine($"{result.Id} {result.Name} ₹{result.Price}");
else
    Console.WriteLine("Product not found");

Console.WriteLine();

Console.WriteLine("Binary Search:");

result = SearchService.BinarySearch(products, 103);

if (result != null)
    Console.WriteLine($"{result.Id} {result.Name} ₹{result.Price}");
else
    Console.WriteLine("Product not found");