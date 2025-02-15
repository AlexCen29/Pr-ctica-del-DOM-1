let contador = 1;

document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();
    subirImagen();
});

document.getElementById("ordenar").addEventListener("click", function(event) {
    event.preventDefault();
    ordenarImagenes();
});

function subirImagen() {
    var urlImagen = document.getElementById("URL").value;
    var descripcion = document.getElementById("descripcion").value;



    verificarImagen(urlImagen, function(esImagen) {
        if (!esImagen) {
            alert("La URL proporcionada no es una imagen válida.");
            return;
        }

        var galeria = document.getElementById("galeria");
        var nuevaImagen = document.createElement("div");
        nuevaImagen.classList.add("card");
        nuevaImagen.style.width = "18rem";
        nuevaImagen.id = "imagen-" + contador;


        nuevaImagen.innerHTML = `
            <img src="${urlImagen}" class="card-img-top" alt="Imagen-${contador}" onclick="cambiarDescripcion('descripcion-${contador}')">
            <div class="card-body">
                <h5 class="card-title">Imagen ${contador}</h5>
                <p id="descripcion-${contador}" class="card-text">${descripcion}</p>
                <button class="btn btn-danger" onclick="eliminarImagen('imagen-${contador}')">Eliminar</button>
            </div>
        `;
        galeria.appendChild(nuevaImagen);

        document.getElementById("URL").value = "";
        document.getElementById("descripcion").value = "";

        console.log(urlImagen);
        console.log(descripcion);

        contador++;
    });
}


function verificarImagen(url, callback) {
    var img = new Image();
    img.onload = function() {
        callback(true);
    };
    img.onerror = function() {
        callback(false);
    };
    img.src = url;
}

function eliminarImagen(idImagen) {
    var eliminar = document.getElementById(idImagen);
    if (eliminar) {
        eliminar.classList.add("eliminar");
        eliminar.addEventListener("animationend", function() {
            eliminar.remove();
        });
    }
}

function cambiarDescripcion(idDescripcion) {
    let descripcion = prompt("Nueva descripcion");
    if (descripcion != null) {
        document.getElementById(idDescripcion).innerHTML = descripcion;
    }
}

function ordenarImagenes(){
    var galeria = document.getElementById("galeria");
    var imagenes = galeria.getElementsByClassName("card");
    var imagenesArray = Array.from(imagenes);

    imagenesArray.sort(function(a, b) {
        var descripcionA = a.getElementsByClassName("card-text")[0].innerHTML;
        var descripcionB = b.getElementsByClassName("card-text")[0].innerHTML;

        if (descripcionA < descripcionB) {
            return -1;
        }
        if (descripcionA > descripcionB) {
            return 1;
        }
        return 0;
    });

    galeria.innerHTML = "";
    imagenesArray.forEach(function(imagen) {
        galeria.appendChild(imagen);
    });
}