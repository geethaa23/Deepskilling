using Microsoft.EntityFrameworkCore;
using RetailInventory.Data;

using var context = new AppDbContext();

var products = await context.Products.ToListAsync();

Console.WriteLine("All Products:");

foreach (var product in products)
{
    Console.WriteLine($"ID: {product.Id}, Name: {product.Name}, Price: {product.Price}");
}

var productById = await context.Products.FindAsync(1);

Console.WriteLine("\nProduct with ID 1:");

if (productById != null)
{
    Console.WriteLine($"Name: {productById.Name}, Price: {productById.Price}");
}

var expensiveProducts = await context.Products
    .Where(p => p.Price > 50000)
    .ToListAsync();

Console.WriteLine("\nExpensive Products:");

foreach (var product in expensiveProducts)
{
    Console.WriteLine($"Name: {product.Name}, Price: {product.Price}");
}