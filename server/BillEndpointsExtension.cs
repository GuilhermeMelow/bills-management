namespace BillsManager;

internal static class BillEndpointsExtension
{
    public static void MapBillEndpoints(this WebApplication app)
    {
        RouteGroupBuilder router = app.MapGroup("/api/bill");

        router.MapPost("/", async (BillRequest request, BillRepository repository) =>
        {
            (string description, decimal price, DateTime validate) = request;
            Bill bill = new(description, price, validate);

            await repository.Add(bill);

            return Results.Created($"/api/bill/{bill.Id}", bill);
        });

        router.MapGet("/", (BillRepository repository) =>
        {
            return Results.Ok(repository.Values);
        });

        router.MapGet("/{id}", (Guid id, BillRepository repository) =>
        {
            Bill result = repository.Values.First(b => b.Id == id);

            result.Validate = DateTime.Now;

            return result;
        });

        router.MapPut("/{id}", async (Guid id, BillRequest request, BillRepository repository) =>
        {
            (string description, decimal price, DateTime validate) = request;
            Bill bill = new(description, price, validate, id);

            await repository.Update(bill);

            return Results.Accepted();
        });
    }

    private record BillRequest(string Description, decimal Price, DateTime Validate);
}
