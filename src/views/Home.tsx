import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { LucideList, ShoppingCart, Wallet } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto mt-24 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-sky-700">
        Bienvenido a KioskApp
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        KioskApp es la plataforma ideal para comprar productos del kiosko
        escolar de manera rápida y sencilla.
      </p>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <LucideList className="h-12 w-12 mb-3 text-sky-600" />
          <h2 className="font-semibold text-xl mb-2">Explora productos</h2>
          <p className="text-gray-600 text-sm">
            Busca productos por nombre, categoría o precio.
          </p>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <ShoppingCart className="h-12 w-12 mb-3 text-sky-600" />
          <h2 className="font-semibold text-xl mb-2">Agrega al carrito</h2>
          <p className="text-gray-600 text-sm">
            Selecciona los productos que necesitas y agrégalos a tu carrito de
            compras.
          </p>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <Wallet className="h-12 w-12 mb-3 text-sky-600" />
          <h2 className="font-semibold text-xl mb-2">Comprá</h2>
          <p className="text-gray-600 text-sm">
            Realiza tu pago de forma segura y rápida a través de MercadoPago
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => navigate("/products")}>
          Comenzar a comprar
        </Button>
      </div>
    </div>
  );
}
