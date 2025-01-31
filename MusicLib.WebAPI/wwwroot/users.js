// загрузка студентов
GetUsers();

// Получение всех студентов
function GetUsers() {
    $.ajax({
        url: 'https://localhost:7110/api/users',
        method: "GET",
        contentType: "application/json",
        success: function (users) {

            let rowsUsers = "";
            $.each(users, function (index, user) {
                // добавляем полученные элементы в таблицу
                rowsUsers += rowUser(user);
            })
            $('#tbodyUsers').append(rowsUsers);
        },
        error: function (x) {
            alert(x.status);
        }
    });
}

// Получение одного студента
function GetUser(id) {
    $.ajax({
        url: 'https://localhost:7110/api/users/' + id,
        method: 'GET',
        contentType: "application/json",
        success: function (user) {
            let form = document.forms["userForm"];
            form.elements["Id"].value = user.id;
            form.elements["email"].value = user.email;
            form.elements["password"].value = user.password;
            form.elements["salt"].value = user.salt;
            form.elements["roleId"].value = user.roleId;
        },
        error: function (x) {
            alert(x.status);
        }
    });
}

// Добавление студента
function CreateUser(userEmail, userPassword, userSalt, userRoleId) {
    $.ajax({
        url: "https://localhost:7110/api/users",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            email: userEmail,
            password: userPassword,
            salt: userSalt,
            roleId: userRoleId
        }),
        success: function (user) {
            $('#tbodyUsers').append(rowUser(user));
            let form = document.forms["userForm"];
            form.reset();
            form.elements["Id"].value = 0;
        },
        error: function (x) {
            alert(x.status);
        }
    })
}

// Изменение студента
function EditUser(userId, userEmail, userPassword, userSalt, userRoleId) {
    let request = JSON.stringify({
        id: userId,
        email: userEmail,
        password: userPassword,
        salt: userSalt,
        roleId: userRoleId
    });
    $.ajax({
        url: "https://localhost:7110/api/users",
        contentType: "application/json",
        method: "PUT",
        data: request,
        success: function (user) {
            $("tr[data-rowid='" + user.id + "']").replaceWith(rowUser(user));
            let form = document.forms["userForm"];
            form.reset();
            form.elements["Id"].value = 0;
        },
        error: function (x) {
            alert(x.status);
        }
    })
}


// Удаление студента
function DeleteUser(id) {
    if (!confirm("Do you really want to delete this user?"))
        return;
    $.ajax({
        url: "https://localhost:7110/api/users/" + id,
        contentType: "application/json",
        method: "DELETE",
        
        success: function (user) {
            $("#tableUsers tr[data-rowid='" + user.id + "']").remove();
        },
        error: function (x, y, z) {
            alert(x.status + '\n' + y + '\n' + z);
        }
    })
}

// создание строки для таблицы
let rowUser = function (user) {
    return "<tr data-rowid='" + user.id + "'><td>" +
        user.email + "</td><td>" +
        user.password + "</td><td>" +
        user.salt + "</td><td>" +
        user.roleId +
        "</td><td><a class='editLink btn btn-warning' data-id='" + user.id + "'>Edit</a>  " +
        "<a class='removeLink btn btn-danger' data-id='" + user.id + "'>Delete</a></td></tr>";
};

// сброс значений формы
$("#resetUser").click(function (e) {
    e.preventDefault();
    let form = document.forms["userForm"];
    form.reset();
    form.elements["Id"].value = 0;
});

// отправка формы
$("#submitUser").click(function (e) {
    e.preventDefault();
    let form = document.forms["userForm"];
    let id = form.elements["Id"].value;
    let email = form.elements["email"].value;
    let password = form.elements["password"].value;
    let salt = form.elements["salt"].value;
    let roleId = form.elements["roleId"].value;

    if (id == 0)
        CreateUser(email, password, salt, roleId);
    else
        EditUser(id, email, password, salt, roleId);
});

// нажимаем на ссылку Изменить
$('#tbodyUsers').on("click", ".editLink", function () {
    let id = $(this).data("id");
    GetUser(id);
});

// нажимаем на ссылку Удалить
$('#tbodyUsers').on("click", ".removeLink", function () {
    let id = $(this).data("id");
    DeleteUser(id);
});