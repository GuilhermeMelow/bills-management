﻿namespace BillsManager;

internal static class BillEndpointsExtension
{
    public static void MapBillEndpoints(this WebApplication app)
    {
        RouteGroupBuilder router = app.MapGroup("/api/bill");

        router.MapPost("/", async (BillRequest request, BillRepository repository) =>
        {
            (string description, decimal price, DateTime validate) = request;
            var bill = new Bill(description, price, validate);

            repository.Add(bill);

            return Results.Created($"/api/bill/{bill.Id}", bill);
        });

        router.MapGet("/", (BillRepository repository) =>
        {
            return Results.Ok(repository.List());
        });

        router.MapGet("/{id}", (Guid id, BillRepository repository) =>
        {
            return repository.List().First(b => b.Id == id);
        });

        router.MapPut("/{id}", async (Guid id, BillRequest request, BillRepository repository) =>
        {
            (string description, decimal price, DateTime validate) = request;
            Bill bill = new(description, price, validate, id);

            repository.Update(bill);

            return Results.Accepted();
        });
    }

    private record BillRequest(string Description, decimal Price, DateTime Validate);
}
