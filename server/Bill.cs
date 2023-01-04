namespace BillsManager;

internal class Bill
{
    public Guid Id { get; private set; }
    public string Description { get; private set; }
    public decimal Price { get; private set; }
    public int DueDate { get; set; }

    public Bill(string description, decimal price, int dueDate, Guid? id = null)
    {
        Id = id ?? Guid.NewGuid();
        Description = description;
        Price = price;
        DueDate = dueDate;
    }
}

