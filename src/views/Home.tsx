import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto mt-24 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-sky-700">
        Bienvenido a KioskApp
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-8">
        KioskApp es la plataforma ideal para gestionar y comprar productos
        escolares de manera rápida y sencilla.
      </p>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center">
          <img src="/products.svg" alt="Productos" className="h-12 w-12 mb-3" />
          <h2 className="font-semibold text-xl mb-2">Explora productos</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Busca y filtra productos escolares por nombre, categoría o escuela.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center">
          <img src="/cart.svg" alt="Carrito" className="h-12 w-12 mb-3" />
          <h2 className="font-semibold text-xl mb-2">Agrega al carrito</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Selecciona los productos que necesitas y agrégalos a tu carrito de
            compras.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center">
          <img src="/report.svg" alt="Soporte" className="h-12 w-12 mb-3" />
          <h2 className="font-semibold text-xl mb-2">Soporte fácil</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            ¿Tienes un problema? Repórtalo fácilmente desde el menú de usuario.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => (window.location.href = "/products")}>
          Comenzar a comprar
        </Button>
      </div>
    </div>
  );
}
