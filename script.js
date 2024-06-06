let alumnos=[]
let cantAlumnosPrimaria=0

function buscarAlumnoApi(){
    return new Promise((resolver, rechazar)=> {
        fetch('https://apidemo.geoeducacion.com.ar/api/testing/encuesta/1')
        .then(response=>{
            if(!response.ok){
                throw new Error('Hubo un error de red')
            }
            return response.json();
            
        })
        .then(datos => {
            resolver(datos)
        })
        .catch(error => {
            rechazar(error)
        })
    })
    
}

function pedirBuscarAlumno(){
    buscarAlumnoApi()
    .then((response) => {
        alumnos=response.data
        mostrarAlumno()
        contarAlumnosPrimaria()

    })
    .catch((error)=>{

    })

}

function mostrarAlumno(){
    if(alumnos.length>0){
        let table=document.getElementById('alumnos').getElementsByTagName('tbody')[0]

        alumnos.forEach((alumno)=> {
            let nuevaFila= table.insertRow()
            let celda0= nuevaFila.insertCell(0)
            let celda1= nuevaFila.insertCell(1)
            let celda2= nuevaFila.insertCell(2)
            let celda3= nuevaFila.insertCell(3)

            celda0.innerHTML =alumno.nombre
            celda1.innerHTML =alumno.apellido
            celda2.innerHTML =alumno.curso
            celda3.innerHTML =alumno.nivel

        })
    }
}
function contarAlumnosPrimaria(){
    if(alumnos.length>0){
        alumnos.forEach(alumno=>{
            if(alumno.id_nivel==1)
            cantAlumnosPrimaria++
        })
    }
    const alumnosDiv=document.getElementById('cantidadAlumnos')
    alumnosDiv.innerHTML=cantAlumnosPrimaria
}