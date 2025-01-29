namespace MusicLib.WebAPI.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Artist { get; set; }

        public Genre? Genre { get; set; }
        public int? GenreId { get; set; }

    }
}
