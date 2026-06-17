namespace GoIsland.Api.Models;

public class Reservation
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ExperienceId { get; set; }
    public int Quantity { get; set; }
    public string Status { get; set; } = "Pending";
    public decimal TotalAmount { get; set; }
    public DateTime ReservationDate { get; set; } = DateTime.UtcNow;
}
