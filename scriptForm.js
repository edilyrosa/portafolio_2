
//* OBTENER LAS REFERENCIAS DEL DOM
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

//* FUNCIONES BOOLIANAS PARA VALIDAR LOS DATOS QUE ENTRAN POR LOS INPUTS, entonces los parametros que esperan, son los input.value
function validaNombre(nombre){
    const patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return patron.test(nombre) && nombre.trim().length > 0;
}

function validaEmail(email){
   const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(email);
}

function validaMensaje(mensaje){
    return mensaje.trim().length >= 10;
}

function mostrarError(elemento, mensaje){
elemento.textContent = mensaje //*Le agrego el texto descriptivo DEL ERROR
elemento.style.display = 'block'     //*Lo hago visible al elemento span
}

function ocultaError(elemento){
    elemento.style.display = 'none'     //*Lo hago INvisible al elemento span
}


// **************************************VALIDACIONES EN TIEMPO REAL
// nameInput.addEventListener('nombre_evento', functionManjadoraDelEvento())
nameInput.addEventListener('input', function(){
    const valor = this.value
    console.log('soy thisssssssssss', this)
    console.log('Digitandoooo', this.value)
    console.log('que soy', this.style) //CSSStyleDeclaration

    if(valor.length > 0){ //Si es verdad que esta escibiendo algo
        if(validaNombre(valor)){ // *Cumple el patron! ✅
            ocultaError(nameError)
            this.style.borderColor = '#4CAF50'
        }else{ // ! NOOO Cumple el patron! ❌
            mostrarError(nameError, 'Solo se aceptan letas 🚩')
            this.style.borderColor = '#f00'
        }
    }else{
        ocultaError(nameError)
            this.style.borderColor = ''
    }

})

emailInput.addEventListener('input', function(){
const valor = this.value
if(valor.length > 0){ //Si escribe
    if(validaEmail(valor)){ //*el valor ingresado en la cajita input cumple con el patron de email
        ocultaError(emailError)
        this.style.borderColor = '#4CAF50'
    }else{ //!no cumple con el patron de email
        mostrarError(emailError, 'El email debe ser válido 🚩')
        this.style.borderColor = '#f00'
    }
}else{ //No ha escrito nada o borro lo que habia escrito
     ocultaError(emailError)
        this.style.borderColor = ''
}
})

messageInput.addEventListener('input', function(){
const valor = this.value
    let longitudActual = valor.trim().length
if(longitudActual > 0){ //Si escribe
    if(validaMensaje(valor)){ //*el valor ingresado en la cajita input cumple con el patron de email
        ocultaError(messageError)
        this.style.borderColor = '#4CAF50'
    }else{ //!no cumple con el patron
        let faltantes = 10 - longitudActual
        mostrarError(messageError, `Faltan ${faltantes} ya que los caracteres minimos con 10 🚩`)
        this.style.borderColor = '#f00'
    }
}else{ //No ha escrito nada o borro lo que habia escrito
    ocultaError(messageError)
        this.style.borderColor = ''
}
})

// **************************************VALIDACIONES PARA ENVIAR EL FORMULARIO 
form.addEventListener('submit', function(e){
    //* 1. prevenir el procesamiento del formulario.
    e.preventDefault() 
    //* 2. limpiar todos los span de error
    ocultaError(nameError)
    ocultaError(emailError)
    ocultaError(messageError)

    //* 3. Bnadera bool para saber si envio o no el form, dependiendo si la data a enviar esta bien (saneada).
    formularioValido  = true //🏳️
    //! validamos si nombre esta mal
    if(!validaNombre(nameInput.value)){
        mostrarError(nameError, 'Solo se aceptan letas 🚩')
        nameInput.style.borderColor = '#f00'
        formularioValido = false //🚩
    } else nameInput.style.borderColor = '#4CAF50'

    //! validamos si email esta mal
    if(!validaEmail(emailInput.value)){ 
        mostrarError(emailError, 'El email debe ser válido 🚩')
        emailInput.style.borderColor = '#f00'
        formularioValido = false
    } else {
        emailInput.style.borderColor = '#4CAF50'
    }

    if(!validaMensaje(messageInput.value)){
        let faltantes  = 10 - messageInput.value.trim().length
        mostrarError(messageError, `El mensaje debe tener mínimo 10 caracteres 🚩, te faltan ${faltantes}`)
        messageInput.style.borderColor = '#f00'
        formularioValido = false //!🚩
    } else {
        messageInput.style.borderColor = '#4CAF50'
    }

    if(!formularioValido){   
        alert('Por favor, corrige los errores en los datos observando las indicaciones e los spans')
        return
    }
    
    
    fetch(form.action, {
        headers: {'Accept': 'application.json'}, 
        method:'POST', 
        body: new FormData(form)})
        .then( repuesta =>{
            if(repuesta.ok) {
                alert(' ✅ Formulario enviado exitosamente!!')
                form.reset()
                nameInput.style.borderColor = ''
                emailInput.style.borderColor = ''
                messageInput.style.borderColor = ''
            }else{
                alert(' ❌⚠️Ha ocurrido un error en el envio del formulario mediamte FormPress ❌⚠️')
            }})
                .catch(error =>{
                    alert(` ❌⚠️Ha ocurrido el error ${error} en el envio del formulario mediamte FormPress ❌⚠️`)
            
                })
})
