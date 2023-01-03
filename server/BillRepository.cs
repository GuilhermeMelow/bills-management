namespace BillsManager
{
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
}
