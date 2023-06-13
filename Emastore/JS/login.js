document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        password: '',
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    
    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputPassword.addEventListener('blur', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnSubmit.addEventListener('click', resetFormulario);

    // Validar
    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
        } else {
            limpiarAlerta(e.target.parentElement);
            email[e.target.name] = e.target.value.trim().toLowerCase();
        }

        if (e.target.id === 'email' && !validarCorreo(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
        }
    }

    function mostrarAlerta(mensaje, referencia) {
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.style.color = 'white';
        error.style.textAlign = 'center';
        error.style.display = 'flex';
        error.style.justifyContent = 'center';
        error.style.alignItems = 'center';
        error.style.backgroundColor = 'red';
        error.id = 'error';
        error.classList.add('error');

        // Verificar si ya existe una alerta previa
        const alertaExistente = referencia.querySelector('.error');
        if (alertaExistente) {
            return; // Si ya existe una alerta, no se duplica
        }

        // Inyectar el error en el formulario
        referencia.appendChild(error);
    }

    // Función para evitar que el formulario se envíe automáticamente
    function enviarEmail(e) {
        e.preventDefault();
    }

    // Función para limpiar las alertas
    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.error');
        if (alerta) {
            alerta.remove();
        }
    }

    // Función para validar el formato del correo
    function validarCorreo(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }

    // Función para resetear el formulario y redireccionar a index.html
    function resetFormulario(e) {
        e.preventDefault()
        formulario.reset();
       alertaLogin();

        setTimeout(() => {
            window.location.href = '/index.html'; 
        }, 2000);

        
    }


    function alertaLogin(){
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
    
        toast.fire({
            icon: 'success',
            title: 'Inicio de sesion exitoso'
        });
    }

});