using GoIsland.Api.Models;

namespace GoIsland.Api.Repositories;

public interface IPaymentRepository
{
    Task<IEnumerable<Payment>> GetByReservationIdAsync(int reservationId);
    Task<Payment?> GetByIdAsync(int id);
    Task<Payment> AddAsync(Payment payment);
    Task UpdateAsync(Payment payment);
}
