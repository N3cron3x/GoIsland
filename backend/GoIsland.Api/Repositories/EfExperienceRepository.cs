using GoIsland.Api.Data;
using GoIsland.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GoIsland.Api.Repositories;

public class EfExperienceRepository : IExperienceRepository
{
    private readonly GoIslandDbContext _context;

    public EfExperienceRepository(GoIslandDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Experience>> GetAllAsync()
    {
        return await _context.Experiences.ToListAsync();
    }

    public Task<Experience?> GetByIdAsync(int id)
    {
        return _context.Experiences.FindAsync(id).AsTask();
    }

    public async Task<IEnumerable<Experience>> SearchAsync(string? location, string? category, decimal? maxPrice)
    {
        var query = _context.Experiences.AsQueryable();

        if (!string.IsNullOrWhiteSpace(location))
        {
            var locationFilter = location.Trim().ToLowerInvariant();
            query = query.Where(experience => experience.Location.ToLower().Contains(locationFilter));
        }

        if (!string.IsNullOrWhiteSpace(category))
        {
            var categoryFilter = category.Trim().ToLowerInvariant();
            query = query.Where(experience => experience.Category.ToLower() == categoryFilter);
        }

        if (maxPrice.HasValue)
        {
            query = query.Where(experience => experience.Price <= maxPrice.Value);
        }

        return await query.ToListAsync();
    }

    public async Task<Experience> AddAsync(Experience experience)
    {
        _context.Experiences.Add(experience);
        await _context.SaveChangesAsync();
        return experience;
    }

    public Task UpdateAsync(Experience experience)
    {
        _context.Experiences.Update(experience);
        return _context.SaveChangesAsync();
    }
}
