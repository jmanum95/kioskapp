import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LucideList, ShoppingCart, Store } from "lucide-react";
import Button from "./ui/Button";

const navItems = [
  { name: "Productos", href: "/products", icon: <LucideList /> },
  { name: "Carrito", href: "/cart", icon: <ShoppingCart /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function handleMenu(action: string) {
    setMenuOpen(false);
    if (action === "cuenta") {
      alert("Cuenta de usuario");
    } else if (action === "reporte") {
      navigate("/report");
    } else if (action === "salir") {
      navigate("/");
    }
  }

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow">
      <div className="mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Store className="h-10 w-10 text-sky-600" />
          {/* <img src="/school-logo.png" className="h-10 w-10"/> */}
          <span className="font-bold text-lg text-sky-600 hidden sm:block">
            {"KioskApp"}
            {/* Nombre del colegio acá */}
          </span>
        </div>
        {/* Mobile menu button */}
        <div className="sm:hidden">
          <Button onClick={() => setOpen(!open)} variant="primary">
            <LucideList className="h-6 w-6 text-sky-600" />
          </Button>
        </div>
        {/* Navigation */}
        <ul className="hidden sm:flex flex-1 justify-center gap-8">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <div
                  onClick={() => {
                    navigate(item.href);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-1 rounded transition-colors font-medium cursor-pointer ${
                    active
                      ? "border-sky-600 text-sky-600 bg-sky-50"
                      : "border-transparent text-gray-700 hover:text-sky-600 hover:bg-sky-50"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </li>
            );
          })}
        </ul>
        {/* User Options Icon */}
        <div className="relative flex items-center">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Opciones de usuario"
          ></button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in-down">
              <button
                className="w-full text-left px-4 py-2 hover:bg-sky-50"
                onClick={() => handleMenu("cuenta")}
              >
                Cuenta
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-sky-50"
                onClick={() => handleMenu("reporte")}
              >
                Reporte de problemas
              </button>
              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
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
        <ul className="sm:hidden flex flex-col gap-2 px-4 pb-4 bg-white border-t border-gray-200 animate-fade-in-down">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center gap-2 py-2 px-2 rounded transition-colors font-medium border-l-4 ${
                    active
                      ? "border-sky-600 text-sky-600 bg-sky-50"
                      : "border-transparent text-gray-700 hover:text-sky-600 hover:bg-sky-50"
                  }`}
                >
                  {/* <img src={item.icon} alt="" className="h-6 w-6" /> */}
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
