using GoIsland.Api.Models;

namespace GoIsland.Api.Services.Security;

public interface IJwtTokenService
{
    (string Token, DateTime ExpiresAt) CreateToken(User user);
}
