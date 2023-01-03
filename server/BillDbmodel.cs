namespace BillsManager;

public class BillDbmodel
{
    public Guid Id { get; init; }
    public string Description { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public DateTime Validate { get; init; }
}
