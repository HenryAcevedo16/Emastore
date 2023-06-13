const listaProducto = document.querySelector('#lista-producto')

fetch("/JS/data.json")
    .then(Response => Response.json())
    .then(data => {
        data.forEach(productos => {
            listaProducto.innerHTML +=`
    <div class="col">
      <div class="card h-100">
        <img src="${productos.imagen}" class="card-img-top" alt="case">
        <div class="card-body">
          <h5 class="card-title">${productos.titulo}"</h5>
          <p class="card-text">${productos.descripcion}</p>
          <p class="precio">Precio: ${productos.precio}</p>
        <button id="boton" class="btn btn-primary btn-sm input agregar-carrito" data-id="${productos.id}">Agregar al Carrito</button>
        </div>
            
            
            `;
        })
    })

    const carrito = document.querySelector('#carrito');
    const contenedorCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn =  document.querySelector('#vaciar-carrito');
    let articulosCarrito = [];
    
    cargarEventListener();
    function cargarEventListener(){
        listaProducto.addEventListener('click', agregarProducto);
    
        //Eliminar productos del carrito
        carrito.addEventListener('click', eliminarproducto);
    
        //Muestra los productos de local Storage
        document.addEventListener('DOMContentLoaded', () => {
            articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];
    
            carritoHTML();
        })
    
        //Vaciar el carrito
        vaciarCarritoBtn.addEventListener('click', () => {
            Swal.fire({
              title: 'Estas seguro?',
              text: "No podras revertirlo!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, borralo!'
            }).then((result) => {
              if (result.isConfirmed) {
                // Code to execute when "Yes" is clicked
                articulosCarrito = [];  //Reseteamos el arreglo
                limpiarHTML(); //Eliminamos todo el html
          
                Swal.fire(
                  'Eliminado!',
                  'Tus productos se eliminaron correctamente.',
                  'success'
                );
              } else {
                // Code to execute when "Cancel" is clicked (optional)
                console.log("Cancel button clicked.");
              }
            });
          });
          
    }
    
    
    //Funciones
    function agregarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')) {
            const productoSeleccionado = e.target.parentElement.parentElement;
            leerDatosProducto(productoSeleccionado);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El pruducto se agrego correctamente',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }
    
    //elimina producto del carrito
    function eliminarproducto(e){
        if(e.target.classList.contains('borrar-producto')){
            const productoId = e.target.getAttribute('data-id');
    
            //Elimino del arreglo de articulosCarrito por el data-id
            articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId)
    
            carritoHTML(); //Itera sobre el carrito y muestra su html
        }
    }
    
    //Lee el contendio del HTML AL QUE LE DIMOS CLICK Y EXTRAE LA INFORMACION SELECCIONADA
    function leerDatosProducto(producto){
        // console.log(tarjeta);
    
        //Crear un objeto con los productos
    
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h5').textContent,
            precio: producto.querySelector('.precio').textContent,
            id: producto.querySelector('button').getAttribute('data-id'),
            cantidad: 1,
        }
    
        //Revisar si un elemento ya existe en el carrito 
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if(existe){
        //Actualizamos la cantidad
        const producto = articulosCarrito.map(producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto;// Retorna el objeto actualizado
            }else{
                return producto; //Retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...producto];
    }else{
        //Agregar Elementos al arreglo del carrito
        articulosCarrito = [... articulosCarrito, infoProducto];
    }
    
       console.log(articulosCarrito);
    
       carritoHTML();
    }
    
    //Muestra el carrito de compras
    function carritoHTML (){
    
        //limpiarhtml
    limpiarHTML();
    
        articulosCarrito.forEach(producto => {
            const {imagen, titulo, precio, cantidad, id} = producto
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
            <img src="${imagen}" width="50">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}"> X </a>
            </td>
            `;
    
    
            //Agrega el HTML del carrito al tbody
            contenedorCarrito.appendChild(row)
        });
    
        //Agregar el carrito de compra al Storage
        sincronizarStorage();
    }
    
    function sincronizarStorage(){
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    }
    
    //Elimina los articulos del carrito
    function limpiarHTML(){
    
    
    
        while(contenedorCarrito.firstChild){
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
    }