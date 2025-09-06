// ===================== CARRITO =====================
let contCarrito = 0;
let productosCarrito = [];

function agregarProductoPorId(id, cantidad = 1) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return console.error("Producto no encontrado");

  const item = productosCarrito.find(p => p.producto.id === id);
  if (item) {
    item.cantidad += cantidad;
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
  for (let i = 0; i < cantidad; i++) {
    productosCarrito.push(producto);
  }

  contCarrito = productosCarrito.length;
  document.getElementById('contador-carrito').textContent = contCarrito;

  mostrarProductos();
}

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

function modificarCantidad(index, cambio) {
  const item = productosCarrito[index];
  item.cantidad += cambio;

  if (item.cantidad <= 0) {
    productosCarrito.splice(index, 1);
  }

  actualizarContador();
  mostrarProductos();
}

function eliminarProducto(index) {
  productosCarrito.splice(index, 1);
  contCarrito = productosCarrito.length;
  document.getElementById('contador-carrito').textContent = contCarrito;
  mostrarProductos();
}

function actualizarTotal() {
  let total = productosCarrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
  document.getElementById('total-carrito').textContent = total;
}

// Validar código de descuento
document.getElementById('validar-descuento').addEventListener('click', () => {
  const codigo = document.getElementById('codigo-descuento').value.trim();
  let total = productosCarrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);

  if (codigo === "DESCUENTO10") {
    total = Math.round(total * 0.9);
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

// ===================== MENÚ HAMBURGUESA =====================
function toggleMenu() {
  const menu = document.querySelector('header .menu');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
}

// Cierra el menú si se hace clic fuera
document.addEventListener('click', function(e) {
  const menu = document.querySelector('header .menu');
  const btn = document.querySelector('.menu-btn');

  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    menu.style.display = 'none';
  }
});
