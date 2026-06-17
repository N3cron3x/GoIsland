using GoIsland.Api.Models;

namespace GoIsland.Api.Repositories;

public interface IReservationRepository
{
    Task<IEnumerable<Reservation>> GetByUserIdAsync(int userId);
    Task<Reservation?> GetByIdAsync(int id);
    Task<Reservation> AddAsync(Reservation reservation);
    Task UpdateAsync(Reservation reservation);
}
