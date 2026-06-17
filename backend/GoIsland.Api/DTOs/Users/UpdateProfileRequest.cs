using System.ComponentModel.DataAnnotations;

namespace GoIsland.Api.DTOs.Users;

public class UpdateProfileRequest
{
    [Required(ErrorMessage = "El nombre completo es obligatorio.")]
    [StringLength(120, MinimumLength = 2, ErrorMessage = "El nombre completo debe tener entre 2 y 120 caracteres.")]
    public string FullName { get; set; } = string.Empty;
}
