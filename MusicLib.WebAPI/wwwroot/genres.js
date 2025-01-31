// Create a new Genres HTML element
const genresElement = document.createElement('div');

genresElement.innerHTML = '<h2> Genres</h2 >' +
    '<form name = "genreForm">' +
    '<input type="hidden" name="Id" value="0" />' +
    '<div class="form-group col-md-5">' +
    '<label for="title">Title:</label>' +
    '<input class="form-control" name="title" /></div>' +
    '<div class="panel-body">' +
    '<a id="submit" class="btn btn-success">Save</a>' + ' ' +
    '<a id="reset" class="btn btn-danger">Clear</a></div>' +
    '</form >' +
    '<table name = "genresTable" class="table table-condensed table-striped col-md-6">' +
    '<thead><tr><th>Id</th><th>Title</th><th></th></tr></thead>' +
    '<tbody></tbody>' +
    '</table>';

// Get All Genres
GetGenres();

// Get All Genres
function GetGenres() {
    $.ajax({
        url: 'https://localhost:7110/api/genres',
        method: "GET",
        contentType: "application/json",
        success: function (genres) {

            let rows = "";
            $.each(genres, function (index, genre) {
                // добавляем полученные элементы в таблицу
                rows += row(genre);
            })
            $("table tbody").append(rows);
        },
        error: function (x) {
            alert(x.status);
        }
    });
}

// Get Genre by Id
function GetGenre(id) {
    $.ajax({
        url: 'https://localhost:7110/api/genres/' + id,
        method: 'GET',
        contentType: "application/json",
        success: function (genre) {
            let form = document.forms["genreForm"];
            form.elements["Id"].value = genre.id;
            form.elements["title"].value = genre.title;
        },
        error: function (x) {
            alert(x.status);
        }
    });
}

// Create Genre
function CreateGenre(genreTitle) {
    $.ajax({
        url: "https://localhost:7110/api/genres",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            title: genreTitle
        }),
        success: function (genre) {
            $("table tbody").append(row(genre));
            let form = document.forms["genreForm"];
            form.reset();
            form.elements["Id"].value = 0;
        },
        error: function (x) {
            alert(x.status);
        }
    })
}

// Edit Genre
function EditGenre(genreId, genreTitle) {
    let request = JSON.stringify({
        id: genreId,
        title: genreTitle
    });
    $.ajax({
        url: "https://localhost:7110/api/genres",
        contentType: "application/json",
        method: "PUT",
        data: request,
        success: function (genre) {
            $("tr[data-rowid='" + genre.id + "']").replaceWith(row(genre));
            let form = document.forms["genreForm"];
            form.reset();
            form.elements["Id"].value = 0;
        },
        error: function (x) {
            alert(x.status);
        }
    })
}


// Delete Genre
function DeleteGenre(id) {
    if (!confirm("Do you really want to delete this genre?"))
        return;
    $.ajax({
        url: "https://localhost:7110/api/genres/" + id,
        contentType: "application/json",
        method: "DELETE",
        success: function (genre) {
            $("tr[data-rowid='" + genre.id + "']").remove();
        },
        error: function (x, y, z) {
            alert(x.status + '\n' + y + '\n' + z);
        }
    })
}

// creating a new row of Genre Table
let row = function (genre) {
    return "<tr data-rowid='" + genre.id + "'><td>" + genre.id + "</td>" +
        "<td>" + genre.title + "</td><td>" +
        "<td><a class='btn btn-warning' data-id='" + genre.id + "'>Edit</a>  " +
        "<a class='btn btn-danger' data-id='" + genre.id + "'>Delete</a></td></tr>";
};

// reset Genre Form
$("#reset").click(function (e) {
    e.preventDefault();
    let form = document.forms["genreForm"];
    form.reset();
    form.elements["Id"].value = 0;
});

// sending Genre Form
$("#submit").click(function (e) {
    e.preventDefault();
    let form = document.forms["genreForm"];
    let id = form.elements["Id"].value;
    let title = form.elements["title"].value;

    if (id == 0)
        CreateGenre(title);
    else
        EditGenre(id, title);
});

// Edit Genre
$("body").on("click", ".editLink", function () {
    let id = $(this).data("id");
    GetGenre(id);
});

// Delete Genre
$("body").on("click", ".removeLink", function () {
    let id = $(this).data("id");
    DeleteGenre(id);
});