import { useEffect, useState } from "react";

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
  image?: string; // Nueva propiedad opcional para imagen
}

// Generar 100 productos de ejemplo
const categories = ["Categoría 1", "Categoría 2", "Categoría 3"];
const schools = ["Escuela 1", "Escuela 2", "Escuela 3"];
const mockProducts: Product[] = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  school: schools[i % schools.length],
  name: `Producto ${String.fromCharCode(65 + (i % 26))}`,
  description: `Descripción del producto ${String.fromCharCode(65 + (i % 26))}`,
  price: 100 + (i % 5) * 50,
  stock: i % 7 === 0 ? 0 : 10 + (i % 10),
  category: categories[i % categories.length],
  is_active: i % 13 !== 0, // algunos inactivos
  image: undefined, // Aquí podrías poner la URL real si la tuvieras
}));

export default function Products() {
  const [search, setSearch] = useState("");
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});

  const filtered = mockProducts.filter(
    (p) =>
      p.is_active &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()))
  );

  // Agrupar productos por categoría
  const grouped = filtered.reduce<Record<string, Product[]>>((acc, prod) => {
    if (!acc[prod.category]) acc[prod.category] = [];
    acc[prod.category].push(prod);
    return acc;
  }, {});

  // Inicializar categorías abiertas si aún no están
  useEffect(() => {
    const initial: Record<string, boolean> = {};
    Object.keys(grouped).forEach((cat) => {
      if (!(cat in openCats)) initial[cat] = true;
    });
    if (Object.keys(initial).length > 0) {
      setOpenCats((prev) => ({ ...initial, ...prev }));
    }
    // eslint-disable-next-line
  }, [search, filtered.length]);

  // Altura de la navbar (h-16 = 64px)
  return (
    <div className="relative" style={{ minWidth: 400 }}>
      <h2 className="text-2xl font-bold mb-2 px-2 pt-2">Productos</h2>
      <div
        className="sticky z-10 bg-white pb-4 pt-2"
        style={{ top: 64, minWidth: 320 }}
      >
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>
      {/* Lista de productos agrupados */}
      <div className="mt-2" style={{ minWidth: 320 }}>
        {Object.keys(grouped).length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No hay productos
          </div>
        ) : (
          Object.entries(grouped).map(([cat, products]) => (
            <div key={cat} className="mb-8">
              {/* Título de categoría como división */}
              <div className="px-4 py-3 bg-sky-50 font-semibold text-sky-700 text-xl rounded-t mb-4">
                {cat}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
                    style={{
                      width: "100%",
                      maxWidth: 480,
                      margin: "0 auto",
                    }}
                  >
                    <img
                      src={product.image || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded mb-2 bg-gray-100"
                    />
                    <h3 className="font-semibold text-lg text-center">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm text-center flex-1">
                      {product.description}
                    </p>
                    <span className="font-bold text-sky-600 text-lg mt-2">
                      ${product.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
