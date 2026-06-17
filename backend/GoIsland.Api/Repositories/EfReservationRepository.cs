using GoIsland.Api.Data;
using GoIsland.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GoIsland.Api.Repositories;

public class EfReservationRepository : IReservationRepository
{
    private readonly GoIslandDbContext _context;

    public EfReservationRepository(GoIslandDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Reservation>> GetByUserIdAsync(int userId)
    {
        return await _context.Reservations
            .Where(reservation => reservation.UserId == userId)
            .ToListAsync();
    }

    public Task<Reservation?> GetByIdAsync(int id)
    {
        return _context.Reservations.FindAsync(id).AsTask();
    }

    public async Task<Reservation> AddAsync(Reservation reservation)
    {
        _context.Reservations.Add(reservation);
        await _context.SaveChangesAsync();
        return reservation;
    }

    public Task UpdateAsync(Reservation reservation)
    {
        _context.Reservations.Update(reservation);
        return _context.SaveChangesAsync();
    }
}
