// загрузка всех при запуске страницы
GetSongs();

// Получение всех
function GetSongs() {
    $.ajax({
        url: 'https://localhost:7110/api/songs',
        method: "GET",
        contentType: "application/json",
        success: function (songs) {

            let rows = "";
            $.each(songs, function (index, song) {
                // добавляем полученные элементы в таблицу
                rows += rowSong(song);
            })
            $('#tbodySongs').append(rows);
        },
        error: function (x) {
            alert(x.status);
        }
    });
}

// Получение одного 
function GetSong(id) {
    $.ajax({
        url: 'https://localhost:7110/api/songs/' + id,
        method: 'GET',
        contentType: "application/json",
        success: function (song) {
            let form = document.forms["songForm"];
            form.elements["Id"].value = song.id;
            form.elements["title"].value = song.title;
            form.elements["artist"].value = song.artist;
            form.elements["genreId"].value = song.genreId;
        },
        error: function (x) {
            alert(x.status);
        }
    });
}

// Добавление одного
function CreateSong(songTitle, songArtist, songGenreId) {
    $.ajax({
        url: "https://localhost:7110/api/songs",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            title: songTitle,
            artist: songArtist,
            genreId: songGenreId
        }),
        success: function (song) {
            $("table tbody").append(rowSong(song));
            let form = document.forms["songForm"];
            form.reset();
            form.elements["Id"].value = 0;
        },
        error: function (x) {
            alert(x.status);
        }
    })
}

// Изменение студента
function EditSong(songId, songTitle, songArtist, songGenreId) {
    let request = JSON.stringify({
        id: songId,
        title: songTitle,
        artist: songArtist,
        genreId: songGenreId
    });
    $.ajax({
        url: "https://localhost:7110/api/songs",
        contentType: "application/json",
        method: "PUT",
        data: request,
        success: function (song) {
            $("tr[data-rowid='" + song.id + "']").replaceWith(rowSong(song));
            let form = document.forms["songForm"];
            form.reset();
            form.elements["Id"].value = 0;
        },
        error: function (x) {
            alert(x.status);
        }
    })
}


// Удаление студента
function DeleteSong(id) {
    if (!confirm("Do you really want to delete this song?"))
        return;
    $.ajax({
        url: "https://localhost:7110/api/songs/" + id,
        contentType: "application/json",
        method: "DELETE",
        
        success: function (song) {
            $("#tableSongs tr[data-rowid='" + song.id + "']").remove();
        },
        error: function (x, y, z) {
            alert(x.status + '\n' + y + '\n' + z);
        }
    })
}

// создание строки для таблицы
let rowSong = function (song) {
    return "<tr data-rowid='" + song.id + "'><td>" +
        song.title + "</td><td>" +
        song.artist + "</td><td>" +
        song.genreId + "</td><td>" +
        "<a class='editLink btn btn-warning' data-id='" + song.id + "'>Edit</a>  " +
        "<a class='removeLink btn btn-success' data-id='" + song.id + "'>Delete</a></td></tr>";
};

// сброс значений формы
$('#resetSong').click(function (e) {
    e.preventDefault();
    let form = document.forms["songForm"];
    form.reset();
    form.elements["Id"].value = 0;
});

// отправка формы
$('#submitSong').click(function (e) {
    e.preventDefault();
    let form = document.forms["songForm"];
    let id = form.elements["Id"].value;
    let title = form.elements["title"].value;
    let artist = form.elements["artist"].value;
    let genreId = form.elements["genreId"].value;

    if (id == 0)
        CreateSong(title, artist, genreId);
    else
        EditSong(id, title, artist, genreId);
});

// нажимаем на ссылку Изменить
$('#tbodySongs').on("click", ".editLink", function () {
    let id = $(this).data("id");
    GetSong(id);
});

// нажимаем на ссылку Удалить
$('#tbodySongs').on("click", ".removeLink", function () {
    let id = $(this).data("id");
    DeleteSong(id);
});
