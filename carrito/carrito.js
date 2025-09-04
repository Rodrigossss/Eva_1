let contCarrito = 0; 
let productosCarrito = [];

function agregarProductoPorId(id, cantidad = 1) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return console.error("Producto no encontrado");

  // Buscar si ya está en el carrito
  const item = productosCarrito.find(p => p.producto.id === id);
  if (item) {
    item.cantidad += cantidad; // suma la cantidad
  } else {
    productosCarrito.push({ producto, cantidad });
  }

  actualizarContador();
  mostrarProductos();
}

function actualizarContador() {
  const total = productosCarrito.reduce((sum, p) => sum + p.cantidad, 0);
  document.getElementById('contador-carrito').textContent = total;
}

function actualizarCarrito(producto, cantidad = 1) {
  // cantidad = 1 por defecto
  for (let i = 0; i < cantidad; i++) {
    productosCarrito.push(producto);
  }

  contCarrito = productosCarrito.length;
  document.getElementById('contador-carrito').textContent = contCarrito;

  mostrarProductos(); // actualiza la vista del carrito
}

function mostrarProductos() {
  const contenedor = document.getElementById('productos-carrito');
  if (!contenedor) return;

  contenedor.innerHTML = ''; // limpia el contenedor

  productosCarrito.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'producto-carrito';
    div.innerHTML = `
      <img src="${item.producto.imagen}" alt="${item.producto.nombre}" width="50">
      <span>${item.producto.nombre}</span>
      <span>Talla: ${item.producto.talla}</span>
      <span>Género: ${item.producto.genero}</span>
      <span>$${item.producto.precio}</span>
      <div class="cantidad">
        <button onclick="modificarCantidad(${index}, -1)">-</button>
        <span>${item.cantidad}</span>
        <button onclick="modificarCantidad(${index}, 1)">+</button>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

function modificarCantidad(index, cambio) {
  const item = productosCarrito[index];
  item.cantidad += cambio;

  if (item.cantidad <= 0) {
    productosCarrito.splice(index, 1); // elimina si llega a 0
  }

  actualizarContador();
  mostrarProductos();
}

function eliminarProducto(index) {
  productosCarrito.splice(index, 1); // elimina del array
  contCarrito = productosCarrito.length;
  document.getElementById('contador-carrito').textContent = contCarrito;
  mostrarProductos();
}

function actualizarTotal() {
  let total = productosCarrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
  document.getElementById('total-carrito').textContent = total;
}

// Llamar actualizarTotal cada vez que cambie el carrito
function mostrarProductos() {
  const contenedor = document.getElementById('productos-carrito');
  if (!contenedor) return;

  contenedor.innerHTML = '';
  productosCarrito.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'producto-carrito';
    div.innerHTML = `
      <img src="${item.producto.imagen}" alt="${item.producto.nombre}" width="50">
      <span>${item.producto.nombre}</span>
      <span>Talla: ${item.producto.talla}</span>
      <span>Género: ${item.producto.genero}</span>
      <span>$${item.producto.precio}</span>
      <div class="cantidad">
        <button onclick="modificarCantidad(${index}, -1)">-</button>
        <span>${item.cantidad}</span>
        <button onclick="modificarCantidad(${index}, 1)">+</button>
      </div>
    `;
    contenedor.appendChild(div);
  });

  actualizarTotal();
}

// Validar código de descuento
document.getElementById('validar-descuento').addEventListener('click', () => {
  const codigo = document.getElementById('codigo-descuento').value.trim();
  let total = productosCarrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);

  if (codigo === "DESCUENTO10") { // ejemplo de código válido
    total = Math.round(total * 0.9); // 10% de descuento
    alert("Código válido! Se aplicó 10% de descuento.");
  } else {
    alert("Código inválido.");
  }

  document.getElementById('total-carrito').textContent = total;
});

// Botón pagar
document.getElementById('btn-pagar').addEventListener('click', () => {
  if (productosCarrito.length === 0) {
    alert("El carrito está vacío!");
    return;
  }
  alert("Procesando pago...");
});