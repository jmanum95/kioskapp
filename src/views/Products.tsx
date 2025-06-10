import { useState } from "react";

// Estructura de producto
export interface Product {
  id: string;
  school: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  is_active: boolean;
}

// Datos de ejemplo
const mockProducts: Product[] = [
  {
    id: "1",
    school: "Escuela 1",
    name: "Producto A",
    description: "Descripción del producto A",
    price: 100,
    stock: 10,
    category: "Categoría 1",
    is_active: true,
  },
  {
    id: "2",
    school: "Escuela 2",
    name: "Producto B",
    description: "Descripción del producto B",
    price: 200,
    stock: 5,
    category: "Categoría 2",
    is_active: true,
  },
  {
    id: "3",
    school: "Escuela 3",
    name: "Producto C",
    description: "Descripción del producto C",
    price: 150,
    stock: 0,
    category: "Categoría 1",
    is_active: false,
  },
];

export default function Products() {
  const [search, setSearch] = useState("");
  const filtered = mockProducts.filter(
    (p) =>
      p.is_active &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Productos</h2>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No hay productos
          </div>
        ) : (
          filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{product.school}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200">
                  {product.category}
                </span>
              </div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm flex-1">
                {product.description}
              </p>
              <div className="flex justify-between items-end mt-2">
                <span className="font-bold text-sky-600 text-lg">
                  ${product.price}
                </span>
                <span
                  className={
                    product.stock > 0
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {product.stock > 0
                    ? `Stock: ${product.stock}`
                    : "Sin stock"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
