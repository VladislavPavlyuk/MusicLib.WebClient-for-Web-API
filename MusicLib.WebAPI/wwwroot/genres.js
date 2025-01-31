// загрузка студентов
        GetGenres();

        // Получение всех студентов
        function GetGenres() {
            $.ajax({
                url: 'https://localhost:7110/api/genres',
                method: "GET",
                contentType: "application/json",
                success: function (genres) {

                    let rows = "";
                    $.each(genres, function (index, genre) {
                        // добавляем полученные элементы в таблицу
                        rows += rowGenre(genre);
                    })
                    $('#tbodyGenres').append(rows);
                },
                error: function (x) {
                    alert(x.status);
                }
            });
        }

        // Получение одного студента
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

        // Добавление студента
        function CreateGenre(genreTitle) {
            $.ajax({
                url: "https://localhost:7110/api/genres",
                contentType: "application/json",
                method: "POST",
                data: JSON.stringify({
                    title: genreTitle
                }),
                success: function (genre) {
                    $('#tbodyGenres').append(rowGenre(genre));
                    let form = document.forms["genreForm"];
                    form.reset();
                    form.elements["Id"].value = 0;
                },
                error: function (x) {
                    alert(x.status);
                }
            })
        }

        // Изменение студента
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
                    $("tr[data-rowid='" + genre.id + "']").replaceWith(rowGenre(genre));
                    let form = document.forms["genreForm"];
                    form.reset();
                    form.elements["Id"].value = 0;
                },
                error: function (x) {
                    alert(x.status);
                }
            })
        }


        // Удаление студента
        function DeleteGenre(id) {
            if (!confirm("Do you really want to delete this genre?"))
                return;
            $.ajax({
                url: "https://localhost:7110/api/genres/" + id,
                contentType: "application/json",
                method: "DELETE",
                
                success: function (genre) {
                    $("#tableGenres tr[data-rowid='" + genre.id + "']").remove();
                },
                error: function (x, y, z) {
                    alert(x.status + '\n' + y + '\n' + z);
                }
            })
        }

        // создание строки для таблицы
        let rowGenre = function (genre) {
            return "<tr data-rowid='" + genre.id + "'>" +
                "<td>" + genre.title + "</td><td>" + 
                "<td><a class='editLink btn btn-warning' data-id='" + genre.id + "'>Edit</a> " +
                "<a class='removeLink btn btn-danger' data-id='" + genre.id + "'>Delete</a></td></tr>";
        };

        // сброс значений формы
        $('#resetGenre').click(function (e) {
            e.preventDefault();
            let form = document.forms["genreForm"];
            form.reset();
            form.elements["Id"].value = 0;
        });

        // отправка формы
        $('#submitGenre').click(function (e) {
            e.preventDefault();
            let form = document.forms["genreForm"];
            let id = form.elements["Id"].value;
            let title = form.elements["title"].value;
            
            if (id == 0)
                CreateGenre(title);
            else
                EditGenre(id, title);
        });

        // нажимаем на ссылку Изменить
        $('#tbodyGenres').on("click", ".editLink", function () {
            let id = $(this).data("id");
            GetGenre(id);
        });

        // нажимаем на ссылку Удалить
        $('#tbodyGenres').on("click", ".removeLink", function () {
            let id = $(this).data("id");
            DeleteGenre(id);
        });