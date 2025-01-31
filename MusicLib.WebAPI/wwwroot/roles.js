﻿// Create a new Roles HTML element
const rolesElement = document.createElement('div');

rolesElement.innerHTML = '<h2>Roles</h2>' +
    '<form name = "roleForm">' +
    '<input type="hidden" name="Id" value="0" />' +
    '<div class="form-group col-md-5">' +
    '<label for="title">Title:</label>' +
    '<input class="form-control" name="title" /></div>' +
    '<div class="panel-body">' +
    '<a id="submit" class="btn btn-success">Save</a>' + ' ' +
    '<a id="reset" class="btn btn-danger">Clear</a></div>' +
    '</form >' +
    '<table name = "rolesTable" class="table table-condensed table-striped col-md-6">' +
    '<thead><tr><th>Id</th><th>Title</th><th></th></tr></thead>' +
    '<tbody></tbody>' +
    '</table>';

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
                rows += row(role);
            })
            $("table tbody").append(rows);
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
            $("table tbody").append(row(role));
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
            $("tr[data-rowid='" + role.id + "']").replaceWith(row(role));
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
            $("tr[data-rowid='" + role.id + "']").remove();
        },
        error: function (x, y, z) {
            alert(x.status + '\n' + y + '\n' + z);
        }
    })
}

// создание строки для таблицы
let row = function (role) {
    return "<tr data-rowid='" + role.id + "'><td>" + role.id + "</td>" +
        "<td>" + role.title + "</td><td>" +
        "<td><a class='editLink' data-id='" + role.id + "'>Edit</a> | " +
        "<a class='removeLink' data-id='" + role.id + "'>Delete</a></td></tr>";
};

// сброс значений формы
$("#reset").click(function (e) {
    e.preventDefault();
    let form = document.forms["roleForm"];
    form.reset();
    form.elements["Id"].value = 0;
});

// отправка формы
$("#submit").click(function (e) {
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
$("body").on("click", ".editLink", function () {
    let id = $(this).data("id");
    GetRole(id);
});

// нажимаем на ссылку Удалить
$("body").on("click", ".removeLink", function () {
    let id = $(this).data("id");
    DeleteRole(id);
});