using Microsoft.EntityFrameworkCore;

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
            if (Database.EnsureCreated())
            { 
                Roles?.Add(new Role
                {
                    Title = "Admin"
                });
                Users?.Add(new User
                {
                    Email = "admin@admin.com",
                    Password = "admin",
                    RoleId = 1
                });
                Genres?.Add(new Genre
                {
                    Title = "Rock"
                });
                Genres?.Add(new Genre
                {
                    Title = "Pop"
                });
                Genres?.Add(new Genre
                {
                    Title = "Jazz"
                });
                Songs?.Add(new Song
                {
                    Title = "Bohemian Rhapsody",
                    Artist = "Queen",
                    GenreId = 1
                });
                Songs?.Add(new Song
                {
                    Title = "Stairway to Heaven",
                    Artist = "Led Zeppelin",
                    GenreId = 1
                });
                Songs?.Add(new Song
                {
                    Title = "Hotel California",
                    Artist = "Eagles",
                    GenreId = 1
                });

                SaveChanges();
            }
            
        }
    }
}
