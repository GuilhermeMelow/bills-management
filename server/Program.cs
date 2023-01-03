using BillsManager;

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

app.MapBillEndpoints();

app.Run();

internal record BillRequest(string Description, decimal Price, DateTime Validate);
