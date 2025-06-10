import { Image } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface Product {
  id: string;
  school: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  is_active: boolean;
  imgUrl?: string;
}

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
  is_active: i % 13 !== 0,
  imgUrl: undefined,
}));

export default function Products() {
  const [search, setSearch] = useState("");
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [ignoreScroll, setIgnoreScroll] = useState(false); // NUEVO

  // Refs para cada categoría
  const catRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const stickyRef = useRef<HTMLDivElement | null>(null);
  // Referencia al contenedor de la lista para hacer scroll al buscar
  const listRef = useRef<HTMLDivElement | null>(null);

  // Filtrado de productos (ya lo tienes, pero lo dejamos explícito para nombre)
  const filtered = mockProducts.filter(
    (p) =>
      p.is_active &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Agrupar productos por categoría
  const grouped = filtered.reduce<Record<string, Product[]>>((acc, prod) => {
    if (!acc[prod.category]) acc[prod.category] = [];
    acc[prod.category].push(prod);
    return acc;
  }, {});

  // Al cambiar la búsqueda, vuelve al inicio y selecciona la primera tab si existe
  useEffect(() => {
    // Scroll al inicio de la lista de productos
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Selecciona la primera categoría si hay resultados
    const firstCat = Object.keys(grouped)[0] ?? null;
    setActiveTab(firstCat);
  }, [search]);

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

  // Scroll a la categoría al hacer click en tab
  useEffect(() => {
    if (activeTab && catRefs.current[activeTab] && ignoreScroll) {
      catRefs.current[activeTab]?.scrollIntoView({ behavior: "smooth", block: "start" });
      // Espera a que termine el scroll y vuelve a activar el scroll automático
      const timeout = setTimeout(() => setIgnoreScroll(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [activeTab, ignoreScroll]);

  // Detectar la categoría visible y marcar la tab activa SOLO si no estamos ignorando scroll
  useEffect(() => {
    if (ignoreScroll) return; // No hacer nada si estamos ignorando scroll por click

    const handleScroll = () => {
      const navbarHeight = 64; // px
      const stickyHeight = stickyRef.current?.offsetHeight ?? 0;
      const scrollY = window.scrollY + navbarHeight + stickyHeight + 8;

      let current: string | null = null;
      Object.entries(catRefs.current).forEach(([cat, ref]) => {
        if (ref) {
          const top = ref.getBoundingClientRect().top + window.scrollY;
          if (scrollY >= top - 32) {
            current = cat;
          }
        }
      });
      if (current && current !== activeTab) setActiveTab(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [grouped, activeTab, ignoreScroll]);

  return (
    <div className="relative max-w-7xl mx-auto px-2 sm:px-4">
      <h2 className="text-2xl font-bold mb-2 px-2 pt-2">Productos</h2>
      {/* Barra de búsqueda y tabs */}
      <div
        ref={stickyRef}
        className="bg-white pt-2 pb-2 sticky z-20" // sticky SIEMPRE, también en mobile
        style={{ top: 64, minWidth: 320 }}
      >
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-1 px-2 py-2 sm:px-4 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        {/* Tabs de categorías debajo de la búsqueda */}
        <div className="flex gap-2 overflow-x-auto px-1 sm:px-2 border-b border-sky-200">
          {Object.keys(grouped).map((cat) => (
            <span
              key={cat}
              className={`cursor-pointer pb-1 text-xs sm:text-sm font-medium transition-colors
                ${activeTab === cat
                  ? "border-b-2 border-sky-600 text-sky-700"
                  : "text-sky-500 hover:text-sky-700"
                }`}
              onClick={() => {
                setIgnoreScroll(true);
                setActiveTab(cat);
              }}
              style={{ minWidth: 60, textAlign: "center" }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
      {/* Lista de productos agrupados */}
      <div ref={listRef} className="mt-2">
        {Object.keys(grouped).length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No hay productos
          </div>
        ) : (
          Object.entries(grouped).map(([cat, products]) => (
            <div
              key={cat}
              ref={el => (catRefs.current[cat] = el)}
              className="mb-4"
            >
              {/* Título de categoría como división */}
              <div className="px-2 py-1 bg-sky-50 font-semibold text-sky-700 text-sm rounded-t mb-1">
                {cat}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-1">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded shadow p-1 flex flex-col gap-1 w-full" // w-full para ocupar todo el ancho
                  >
                    {product.imgUrl ? (
                      <img
                        src={product.imgUrl}
                        alt={product.name}
                        className="w-full h-12 object-cover rounded mb-1 bg-gray-100"
                      />
                    ) : (
                      <Image className="w-full h-12 rounded mb-1 bg-gray-100" />
                    )}
                    <h3 className="font-semibold text-[10px] text-center">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-[10px] text-center flex-1">
                      {product.description}
                    </p>
                    <span className="font-bold text-sky-600 text-xs mt-1 text-center">
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
