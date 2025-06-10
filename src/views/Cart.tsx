import { useState } from "react";

// Simulación de productos en el carrito
const initialCart = [
  {
    id: "1",
    school: "Escuela 1",
    name: "Producto A",
    description: "Descripción del producto A",
    price: 120,
    stock: 10,
    category: "Útiles",
    is_active: true,
    quantity: 2,
  },
  {
    id: "2",
    school: "Escuela 2",
    name: "Producto B",
    description: "Descripción del producto B",
    price: 80,
    stock: 5,
    category: "Libros",
    is_active: true,
    quantity: 1,
  },
];

export default function Cart() {
  const [cart, setCart] = useState(initialCart);
  const [showPanel, setShowPanel] = useState(false);
  const [order, setOrder] = useState({ name: "", email: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  function handleOrderChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOrder({ ...order, [e.target.name]: e.target.value });
  }

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setOrderPlaced(true);
    setShowPanel(false);
    setCart([]);
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-4">
      <h2 className="text-2xl font-bold mb-4">Carrito de compras</h2>
      {orderPlaced && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">¡Orden realizada con éxito! Gracias por tu compra.</div>
      )}
      {cart.length === 0 ? (
        <div className="text-center text-gray-500">Tu carrito está vacío.</div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                  <div className="text-xs text-gray-400">{item.school} - {item.category}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">${item.price} x {item.quantity}</div>
                  <div className="text-sm text-gray-600">Subtotal: ${item.price * item.quantity}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-lg">${total}</span>
          </div>
          <button
            className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition"
            onClick={() => setShowPanel(true)}
          >
            Pagar
          </button>
        </>
      )}
      {/* Panel de pago */}
      {showPanel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-xs relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setShowPanel(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Datos para la orden</h3>
            <form onSubmit={handlePay} className="flex flex-col gap-3">
              <input
                name="name"
                type="text"
                placeholder="Nombre completo"
                value={order.name}
                onChange={handleOrderChange}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={order.email}
                onChange={handleOrderChange}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
              <button
                type="submit"
                className="bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition mt-2"
              >
                Finalizar compra
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
