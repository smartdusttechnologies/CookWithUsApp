namespace ServiceBooking.Buisness.Repository.Interface
{
    public interface IResturantRepository
    {
        object Get();
        object Get(string resturantId);
    }
}