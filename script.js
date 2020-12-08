$(document).ready(function () {
    $("#submit").click(
        function () {
                x = document.getElementById('value_x'),
                y = document.getElementById('value_y'),
                radios = document.getElementsByName('r');

            for (var i = 0, length = radios.length; i < length; i++)
            {
                if (radios[i].checked)
                {
                    r = radios[i];
                    break;
                }
            }
            console.log("Началось");
            sendAjaxForm('post.php');
            console.log("Закончилось");
            return false;
        }
    );
});

let
    x = document.getElementById('value_x'),
    y = document.getElementById('value_y'),
    radios = document.getElementsByName('r');

for (var i = 0, length = radios.length; i < length; i++)
{
    if (radios[i].checked)
    {
        r = radios[i];
        break;
    }
}

function sendAjaxForm(url) {

    console.log(x.value)
    console.log(y.value)
    console.log(r)
    console.log(r.value)

    if (checkY() && checkX() && checkR()) {
        console.log(x.value)
        console.log(y.value)
        console.log(r.value)
        $.ajax({
            url: url,
            type: "POST",
            dataType: "html",
            data: {
                x: x.value.trim().replace(",", "."),
                y: y.value.trim().replace(",", "."),
                r: r.value.trim().replace(",", ".")
            },
            success: function (response) {
                console.log("Получили от сервера")
                $('#result').html(response);
            },
            error: function (response) {
                document.getElementById('error').innerHTML = '<b>Не работает, иди исправляй</b>';
            }
        });
    }
}

function checkY() {
    console.log(y);
    console.log("Началась проверка");
    if (y === null || y === undefined) {
        return false;
    } else {
        let y_func = y.value.trim().replace(",", ".");
        if (y_func === "") {
            document.getElementById('error').innerHTML = '<b>Заполните поле Y!</b>';
            y.style.background = '#e51212'
            return false;
        } else if ((y_func.includes("-0") && !y_func.includes(".")) || !isFinite(y_func)) {
            document.getElementById('error').innerHTML = '<b>Y должно быть числом!</b>';
            y.style.background = '#e51212'
            return false;
        } else if (y_func >= 5 || y_func <= -5) {
            document.getElementById('error').innerHTML = '<b>Y должно быть в диапазоне:<br>(-5 ... 5)!</br>';
            y.style.background = '#e51212'
            return false;
        } else
            console.log("Работает")
        y.style.background = '#6092ba'
        return true;
    }
    return false;
}

function checkX() {
    console.log(x);
    console.log("Началась проверка");
    if (x=== null || x === undefined) {
        return false;
    } else {
        let x_func = x.value.trim().replace(",", ".");
        if (x_func === "") {
            document.getElementById('error').innerHTML = '<b>Заполните поле X!</b>';
            x.style.background = '#e51212'
            return false;
        } else if ((x_func.includes("-0") && !x_func.includes(".")) || !isFinite(x_func)) {
            document.getElementById('error').innerHTML = '<b>X должно быть числом!</b>';
            x.style.background = '#e51212'
            return false;
        } else if (x_func >= 3 || x_func <= -5) {
            document.getElementById('error').innerHTML = '<b>X должно быть в диапазоне:<br>(-5 ... 3)!</br>';
            x.style.background = '#e51212'
            return false;
        } else
            console.log("Работает")
        y.style.background = '#6092ba'
        return true;
    }
    return false;
}
function checkR(){
    var radios = document.getElementsByName('r');

    for (var i = 0, length = radios.length; i < length; i++)
    {
        if (radios[i].checked)
        {
            return true;
        }
    }
    return false;
}