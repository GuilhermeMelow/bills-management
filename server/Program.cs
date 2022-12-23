var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var MY_CORS_POLICY = "MyPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MY_CORS_POLICY, policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5173")
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

builder.Services.AddSingleton<BillRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MY_CORS_POLICY);
app.UseHttpsRedirection();

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

app.Run();

internal record BillRequest(string Description, decimal Price, DateTime Validate);

internal class BillRepository
{
    private readonly List<Bill> bills = new();

    public IReadOnlyList<Bill> Values
    {
        get => bills;
    }

    public Task Add(Bill bill)
    {
        bills.Add(bill);

        return Task.CompletedTask;
    }

    public Task Update(Bill bill)
    {
        var index = bills.FindIndex(c => c.Id == bill.Id);

        bills[index] = bill;

        return Task.CompletedTask;
    }

    public Task Remove(Bill bill)
    {
        bills.Remove(bill);

        return Task.CompletedTask;
    }
}

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
