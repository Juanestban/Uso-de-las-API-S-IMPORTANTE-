let Login = document.getElementById('control');

function DescargarUsuarios(cantidad) {
    const apiUrl = `https://randomuser.me/api/?results=${cantidad}&nat=es`;
    fetch(apiUrl)
        .then(resp => resp.json())
        .then(datos => salidaHTML(datos));

}

const dato = (name, picture, email, pass, user, phone, city, state) => {
    Login.style.visibility = 'visible';
    let password = document.getElementById('pass1');

    document.getElementById('control').innerHTML = `
        <input type="button" id="Cerrar" onclick="cerrar()" value="x">
        <div class="contentlogueo" id="temporal">
            <div class="img">
                <div class="img2">
                    <img src="${picture}">
                </div>
                <label>${name}</label>
            </div>
            <div class="password">
                <input type="text" id="pass1" placeholder="Contraseña">
            </div>
            <div class="button">
                <input type="button" id="validacion" value="Iniciar sesión">
                <br>
            </div>
            <p id="respuestaErr"></p>
        </div>
    `;

    $('#validacion').click(function () {
        console.log(password.value + " " + pass);
        if (document.getElementById('pass1').value == pass) {
            document.getElementById('control').innerHTML = `
            <div class="contentlogueo" id="temporal">
                <div class="img">
                    <div class="img2">
                        <img src="${picture}">
                    </div>
                    <label>${name}</label>
                </div>
                <div class="password">
                    <p>
                        <br>Correo: ${email}
                        <br>usuario: ${user}
                        <br>password: ${pass}
                        <br>Telefono: ${phone}
                        <br>Estado: ${state}
                        <br>Ciudad: ${city}
                    </p>
                    <br>
                    <p>Inicio de sesión satisfactorio</p>
                </div>
            </div>
        `;
        }else {
            document.getElementById('respuestaErr').innerHTML = 'Error al digitar su contraseña';
        }
    });
}

function cerrar() {
    Login.style.visibility = 'hidden';
}

//$(document).ready(function() {
function salidaHTML(datosJson) {
    const resultados = datosJson.results;

    let cuentas = "";
    let pos = 0;
    console.log(resultados);
    resultados.forEach(element => {
        const rr = `
                <div id="user${pos}" class="datosAll" onclick="dato('${element.name.first}', '${element.picture.large}', '${element.email}', '${element.login.password}', '${element.login.username}', '${element.phone}', '${element.location.city}', '${element.location.state}')">
                    <img id="img${pos}" src="${element.picture.large}">
                    <div class="titleContent">
                        <h3>${element.name.first}</h3>
                    </div>
                </div>
            `;
        cuentas += rr;
        pos++;
    });

    document.getElementById("user").innerHTML = `${cuentas}`;

    console.log(resultados.email);
}

DescargarUsuarios(3);
//});