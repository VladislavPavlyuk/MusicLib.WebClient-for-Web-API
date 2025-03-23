namespace MusicLib.WebAPI.Models
{
    public class Genre
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public ICollection<Song>? Songs { get; set; }
    }
}
