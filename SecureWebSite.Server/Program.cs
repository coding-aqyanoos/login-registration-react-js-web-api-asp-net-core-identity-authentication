using Microsoft.EntityFrameworkCore;
using SecureWebSite.Server.Data;
using SecureWebSite.Server.Models;

namespace SecureWebSite.Server
{
		public class Program
		{
				public static void Main(string[] args)
				{
						var builder = WebApplication.CreateBuilder(args);

						// Add services to the container.

						builder.Services.AddControllers();
						builder.Services.AddAuthorization();
						builder.Services.AddDbContext<ApplicationDbContext>(options =>{
								options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
						});

						builder.Services.AddIdentityApiEndpoints<User>().AddEntityFrameworkStores<ApplicationDbContext>();

						builder.Services.AddIdentityCore<User>(options => {
								options.SignIn.RequireConfirmedAccount = true;
								options.Password.RequireDigit = true;
								options.Password.RequireNonAlphanumeric = true;
								options.Password.RequireUppercase = true;
								options.Password.RequiredLength = 6;
								options.Password.RequiredUniqueChars = 0;

								options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
								options.Lockout.MaxFailedAccessAttempts = 5;
								options.Lockout.AllowedForNewUsers = true;

								// User settings.
								options.User.AllowedUserNameCharacters =
								"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
								options.User.RequireUniqueEmail = true;

						}).AddEntityFrameworkStores<ApplicationDbContext>();

						var app = builder.Build();

						app.UseDefaultFiles();
						app.UseStaticFiles();

						// Configure the HTTP request pipeline.

						app.UseHttpsRedirection();

						app.UseAuthorization();
						app.MapIdentityApi<User>();

						app.MapControllers();

						app.MapFallbackToFile("/index.html");

						app.Run();
				}
		}
}
