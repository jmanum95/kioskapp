import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Productos", href: "/products", icon: "/products.svg" },
  { name: "Carrito", href: "/cart", icon: "/cart.svg" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function handleMenu(action: string) {
    setMenuOpen(false);
    if (action === "cuenta") {
      // Aquí podrías navegar a la cuenta o mostrar un panel
      alert("Cuenta de usuario");
    } else if (action === "reporte") {
      navigate("/report");
    } else if (action === "salir") {
      navigate("/");
    }
  }

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
          <span className="font-bold text-lg text-sky-600 hidden sm:block">
            KioskApp
          </span>
        </div>
        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        {/* Navigation */}
        <ul className="hidden sm:flex flex-1 justify-center gap-8">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-1 rounded transition-colors font-medium border-b-2 ${
                    active
                      ? "border-sky-600 text-sky-600 bg-sky-50 dark:bg-sky-950"
                      : "border-transparent text-gray-700 dark:text-gray-200 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950"
                  }`}
                >
                  <img src={item.icon} alt="" className="h-6 w-6" />
                  <span>{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
        {/* User Options Icon */}
        <div className="relative flex items-center">
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Opciones de usuario"
          >
            <svg
              className="h-8 w-8 text-sky-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth={2} />
              <path d="M4 20c0-2.5 3.5-4.5 8-4.5s8 2 8 4.5" stroke="currentColor" strokeWidth={2} />
              <circle cx="19" cy="5" r="2" fill="currentColor" className="text-sky-400" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded shadow-lg z-50 animate-fade-in-down">
              <button
                className="w-full text-left px-4 py-2 hover:bg-sky-50 dark:hover:bg-sky-950"
                onClick={() => handleMenu("cuenta")}
              >
                Cuenta
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-sky-50 dark:hover:bg-sky-950"
                onClick={() => handleMenu("reporte")}
              >
                Reporte de problemas
              </button>
              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                onClick={() => handleMenu("salir")}
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Mobile menu */}
      {open ? (
        <ul className="sm:hidden flex flex-col gap-2 px-4 pb-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 animate-fade-in-down">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center gap-2 py-2 px-2 rounded transition-colors font-medium border-l-4 ${
                    active
                      ? "border-sky-600 text-sky-600 bg-sky-50 dark:bg-sky-950"
                      : "border-transparent text-gray-700 dark:text-gray-200 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950"
                  }`}
                >
                  <img src={item.icon} alt="" className="h-6 w-6" />
                  <span>{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </nav>
  );
}

export default Navbar;
