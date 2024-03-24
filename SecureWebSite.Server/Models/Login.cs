namespace SecureWebSite.Server.Models
{
		public class Login
		{
		   public string? Username { get; set; }
		   public string? Email { get; set; }
		   public string? Password { get; set; }
		   public bool Remember { get; set; } = false;
		}
}
