namespace BillsManager
{
    internal static class BillEndpointsExtension
    {
        public static void MapBillEndpoints(this WebApplication app)
        {
            var billApi = app.MapGroup("/api/bill");

            billApi.MapPost("/", async (BillRequest request, BillRepository repository) =>
            {
                var (description, price, validate) = request;
                var bill = new Bill(description, price, validate);

                await repository.Add(bill);

                return Results.Created($"/api/bill/{bill.Id}", bill);
            });

            billApi.MapGet("/", (BillRepository repository) =>
            {
                return Results.Ok(repository.Values);
            });

            billApi.MapGet("/{id}", (Guid id, BillRepository repository) =>
            {
                var result = repository.Values.First(b => b.Id == id);

                result.Validate = DateTime.Now;

                return result;
            });

            billApi.MapPut("/{id}", async (Guid id, BillRequest request, BillRepository repository) =>
            {
                var (description, price, validate) = request;
                var bill = new Bill(description, price, validate, id);

                await repository.Update(bill);

                return Results.Accepted();
            });
        }
    }
}
