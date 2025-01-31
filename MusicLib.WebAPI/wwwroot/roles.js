// загрузка студентов
GetRoles();

// Получение всех студентов
function GetRoles() {
    $.ajax({
        url: 'https://localhost:7110/api/roles',
        method: "GET",
        contentType: "application/json",
        success: function (roles) {

            let rows = "";
            $.each(roles, function (index, role) {
                // добавляем полученные элементы в таблицу
                rows += rowRole(role);
            })
            $('#tbodyRoles').append(rows);
        },
        error: function (x) {
            alert(x.status);
        }
    });
}

// Получение одного студента
function GetRole(id) {
    $.ajax({
        url: 'https://localhost:7110/api/roles/' + id,
        method: 'GET',
        contentType: "application/json",
        success: function (role) {
            let form = document.forms["roleForm"];
            form.elements["Id"].value = role.id;
            form.elements["title"].value = role.title;
        },
        error: function (x) {
            alert(x.status);
        }
    });
}

// Добавление студента
function CreateRole(roleTitle) {
    $.ajax({
        url: "https://localhost:7110/api/roles",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            title: roleTitle
        }),
        success: function (role) {
            $("table tbody").append(rowRole(role));
            let form = document.forms["roleForm"];
            form.reset();
            form.elements["Id"].value = 0;
        },
        error: function (x) {
            alert(x.status);
        }
    })
}

// Изменение студента
function EditRole(roleId, roleTitle) {
    let request = JSON.stringify({
        id: roleId,
        title: roleTitle
    });
    $.ajax({
        url: "https://localhost:7110/api/roles",
        contentType: "application/json",
        method: "PUT",
        data: request,
        success: function (role) {
            $("tr[data-rowid='" + role.id + "']").replaceWith(rowRole(role));
            let form = document.forms["roleForm"];
            form.reset();
            form.elements["Id"].value = 0;
        },
        error: function (x) {
            alert(x.status);
        }
    })
}


// Удаление студента
function DeleteRole(id) {
    if (!confirm("Do you really want to delete this role?"))
        return;
    $.ajax({
        url: "https://localhost:7110/api/roles/" + id,
        contentType: "application/json",
        method: "DELETE",
        
        success: function (role) {
            $("#tableRoles tr[data-rowid='" + role.id + "']").remove();
        },
        error: function (x, y, z) {
            alert(x.status + '\n' + y + '\n' + z);
        }
    })
}

// создание строки для таблицы
let rowRole = function (role) {
    return "<tr data-rowid='" + role.id + "'>" +
        "<td>" + role.title + "</td><td>" +
        "<td><a class='editLink btn btn-warning' data-id='" + role.id + "'>Edit</a>  " +
        "<a class='removeLink btn btn-danger' data-id='" + role.id + "'>Delete</a></td></tr>";
};

// сброс значений формы
$("#resetRole").click(function (e) {
    e.preventDefault();
    let form = document.forms["roleForm"];
    form.reset();
    form.elements["Id"].value = 0;
});

// отправка формы
$("#submitRole").click(function (e) {
    e.preventDefault();
    let form = document.forms["roleForm"];
    let id = form.elements["Id"].value;
    let title = form.elements["title"].value;

    if (id == 0)
        CreateRole(title);
    else
        EditRole(id, title);
});

// нажимаем на ссылку Изменить
$('#tbodyRoles').on("click", ".editLink", function () {
    let id = $(this).data("id");
    GetRole(id);
});

// нажимаем на ссылку Удалить
$('#tbodyRoles').on("click", ".removeLink", function () {
    let id = $(this).data("id");
    DeleteRole(id);
});