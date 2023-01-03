namespace BillsManager;

internal class Bill
{
    public Guid Id { get; private set; }
    public string Description { get; private set; }
    public decimal Price { get; private set; }
    public DateTime Validate { get; set; }

    public Bill(string description, decimal price, DateTime validate, Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        Description = description;
        Price = price;
        Validate = validate;
    }
}

