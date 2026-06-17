using System.Security.Claims;
using GoIsland.Api.DTOs.Users;
using GoIsland.Api.Repositories;
using GoIsland.Api.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GoIsland.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _users;

    public UsersController(IUserRepository users)
    {
        _users = users;
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile(UpdateProfileRequest request)
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdValue, out var userId))
        {
            return Unauthorized(new { message = "El token no es valido." });
        }

        var user = await _users.GetByIdAsync(userId);
        if (user is null)
        {
            return NotFound(new { message = "No se encontro el usuario." });
        }

        user.FullName = request.FullName.Trim();
        await _users.UpdateAsync(user);

        return Ok(AuthService.ToResponse(user));
    }
}
