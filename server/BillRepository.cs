using MongoDB.Driver;

namespace BillsManager;

internal class BillRepository
{
    private readonly IMongoCollection<BillDbmodel> collection;

    public BillRepository(MongoClient client)
    {
        var db = client.GetDatabase("BillsManager");

        collection = db.GetCollection<BillDbmodel>("Bill");
    }

    public IEnumerable<Bill> List()
    {
        var result = collection.Aggregate().ToList();

        if (result is null) return Enumerable.Empty<Bill>();

        return result.Select(c => new Bill(c.Description, c.Price, c.Validate, c.Id));
    }

    public void Add(Bill bill)
    {
        var document = new BillDbmodel
        {
            Id = bill.Id,
            Validate = bill.Validate,
            Price = bill.Price,
            Description = bill.Description,
        };

        collection.InsertOne(document);
    }

    public void Update(Bill bill)
    {
        var document = new BillDbmodel
        {
            Id = bill.Id,
            Validate = bill.Validate,
            Price = bill.Price,
            Description = bill.Description,
        };

        collection.ReplaceOne(c => c.Id == bill.Id, document);
    }

    public void Remove(Bill bill)
    {
        collection.DeleteOne(c => c.Id == bill.Id);
    }
}
