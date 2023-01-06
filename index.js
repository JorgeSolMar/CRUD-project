// Variables globales

let formularioUI = document.getElementById('formulario');
let listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];




// Funciones

let CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: false
    }
    arrayActividades.push(item);
    return item;
}

let GuardarDB = () => {
    localStorage.setItem('rutina', JSON.stringify(arrayActividades));
    PintarDB();
}

let PintarDB = () => {
    listaActividadesUI.innerHTML = '';
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));
    if(arrayActividades === null){
        arrayActividades = [];
    }else{
        arrayActividades.forEach(element => {
            if(element.estado){
                listaActividadesUI.innerHTML += `<div class="alert alert-success" role="alert"><span class="material-symbols-outlined">trending_up</span><b>${element.actividad}</b> - ${element.estado}<span class="d-grid gap-2 d-md-flex justify-content-md-end"><button type="button" class="btn btn-success">Completado</button><button type="button" class="btn btn-danger">Eliminar</button></span></div>`

            }else{
                listaActividadesUI.innerHTML += `<div class="alert alert-danger" role="alert"><span class="material-symbols-outlined">trending_up</span><b>${element.actividad}</b> - ${element.estado}<span class="d-grid gap-2 d-md-flex justify-content-md-end"><button type="button" class="btn btn-success">Completado</button><button type="button" class="btn btn-danger">Eliminar</button></span></div>`        

            }
            
        });
    }

}
let EliminarDb = (actividad) => {
    let indexArray;
    arrayActividades.forEach((elemento, index) => {
        if(elemento.actividad === actividad){
            indexArray = index;
        } 

    })
    arrayActividades.splice(indexArray,1);
    GuardarDB();
}

let EditarDB = (actividad) => {
    let indexArray = arrayActividades.findIndex((elemento)=>{
        return elemento.actividad === actividad

    });
    
    arrayActividades[indexArray].estado = true;
    GuardarDB();
}



// EventListener
formularioUI.addEventListener('submit', (e) => {

    e.preventDefault();
    let actividadUI = document.querySelector('#actividad').value;

    CrearItem(actividadUI);
    GuardarDB();

    formularioUI.reset();
});

document.addEventListener('DOMContentLoaded', PintarDB);

listaActividadesUI.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(e.target.innerHTML === 'Completado' || e.target.innerHTML === 'Eliminar'){
        let texto = e.path[2].childNodes[1].innerHTML;
        if(e.target.innerHTML === 'Eliminar') {
            //Accion de eliminar
            EliminarDb(texto)
        }
        if(e.target.innerHTML === 'Completado') {
            //Accion de editar
            EditarDB(texto)

        }


    }

});