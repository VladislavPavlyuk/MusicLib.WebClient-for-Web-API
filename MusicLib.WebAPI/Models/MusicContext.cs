using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MusicLib.WebAPI.Models
{
    public class MusicContext : DbContext
    {
        public DbSet<Role> Roles { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<User> Users { get; set; }
        public MusicContext(DbContextOptions<MusicContext> options)
            : base(options)
        {
            //try {

                if (Database.EnsureCreated()) {

                    Roles?.Add(new Role { Title = "Admin" });
                    Roles?.Add(new Role { Title = "User" });

                    Genres?.Add(new Genre { Title = "Rock" });
                    Genres?.Add(new Genre { Title = "Pop" });
                    Genres?.Add(new Genre { Title = "Jazz" });

                    Songs?.Add(new Song { Title = "Bohemian Rhapsody", Artist = "Queen", GenreId = 1 });
                    Songs?.Add(new Song { Title = "Stairway to Heaven", Artist = "Led Zeppelin", GenreId = 1 });
                    Songs?.Add(new Song { Title = "Hotel California", Artist = "Eagles", GenreId = 1 });
                    Songs?.Add(new Song { Title = "Billie Jean", Artist = "Michael Jackson", GenreId = 2 });
                    Songs?.Add(new Song { Title = "Thriller", Artist = "Michael Jackson", GenreId = 2 });
                    Songs?.Add(new Song { Title = "Smooth Criminal", Artist = "Michael Jackson", GenreId = 2 });
                    Songs?.Add(new Song { Title = "So What", Artist = "Miles Davis", GenreId = 3 });
                    Songs?.Add(new Song { Title = "Take Five", Artist = "Dave Brubeck", GenreId = 3 });
                    Songs?.Add(new Song { Title = "Blue in Green", Artist = "Miles Davis", GenreId = 3 });

                    Users?.Add(new User { Email = "admin@admin.com", Password = "admin", Salt = "salt", RoleId = 1 });

                    SaveChanges();
                }
            /*}

            catch (InvalidOperationException ex) { 
                Console.WriteLine("Invalid input: " + ex.Message + "\nThe exception that is thrown when a method call is invalid for the object's current state.");
            }
            catch (ArgumentNullException ex) { Console.WriteLine("Invalid input: " + ex.Message + "\nCreates a new ArgumentNullException with its message\r\n string set to a default message explaining an argument was null."); 
            }
            catch (ArgumentException ex) { Console.WriteLine("Invalid input: " + ex.Message + "\nThe exception that is thrown when one of the arguments provided to a method is not valid."); 
            }
            catch (SqlException ex) { Console.WriteLine("SqlException " + ex.Message + "\nThe exception that is thrown when SQL Server returns a warning or error. This\r\n  class cannot be inherited."); 
            }
            catch (DbUpdateException ex) { Console.WriteLine("Database update error: " + ex.Message + "\nAn exception that is thrown when an error is encountered while saving to the\r\n   database."); 
            }
            catch (UnauthorizedAccessException ex) { Console.WriteLine("UnauthorizedAccessException " + ex.Message + "\nThe exception that is thrown when the operating system denies access because of an I/O error or a specific type of security error."); 
            }
            catch (HttpRequestException ex) { Console.WriteLine("HttpRequestException " + ex.Message); 
            }
            catch (TaskCanceledException ex) { Console.WriteLine(" TaskCanceledException" + ex.Message + "\nRepresents an exception used to communicate task cancellation."); 
            }
            catch (Exception ex) { Console.WriteLine("An unexpected error occurred: " + ex.Message); }*/
            
        }

        /*/ Класс необходим исключительно для миграций
        public class SampleContextFactory : IDesignTimeDbContextFactory<MusicContext>
        {
            public MusicContext CreateDbContext(string[] args)
            {
                var optionsBuilder = new DbContextOptionsBuilder<MusicContext>();

                // получаем конфигурацию из файла appsettings.json
                ConfigurationBuilder builder = new ConfigurationBuilder();
                builder.SetBasePath(Directory.GetCurrentDirectory());
                builder.AddJsonFile("appsettings.json");
                IConfigurationRoot config = builder.Build();

                // получаем строку подключения из файла appsettings.json
                string connectionString = config.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
                return new MusicContext(optionsBuilder.Options);
            }

        }*/
    }
}
