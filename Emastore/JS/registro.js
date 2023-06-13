document.addEventListener('DOMContentLoaded', function() {
    const email = {
      nombre:'',
      apellido:'',
      email: '',
      password: '',
    }
  
    // Seleccionar los elementos de la interfaz
    const inputNombre = document.querySelector('#nombres');
    const inputApellido = document.querySelector('#apellidos');
    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    
    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputNombre.addEventListener('blur', validar);
    inputApellido.addEventListener('blur', validar);
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
      const alertaExistente = referencia.querySelector('.error');
      if (alertaExistente) {
        return; // Si ya existe una alerta, no se duplica
      }
  
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
  
      // Inyectar el error en el formulario
      referencia.appendChild(error);
    }
  
    // Función para evitar que el formulario se envíe automáticamente
    function enviarEmail(event) {
      event.preventDefault();
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
  
    // Función para resetear el formulario y redireccionar a login
function resetFormulario(e) {
    e.preventDefault();
    alertaRegistro();
    formulario.reset();
  
    setTimeout(() => {
      window.location.href = '/paginas/login.html';
    }, 2000);
  }
  
    function alertaRegistro() {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro Exitoso',
            showConfirmButton: false,
            timer: 1500
          })
    }
  });
