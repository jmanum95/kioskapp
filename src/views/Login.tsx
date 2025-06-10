import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ user: "", pass: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      if (form.user === "admin" && form.pass === "admin") {
        // Simula login exitoso
        window.location.href = "/products";
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    }, 1000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xs mx-auto mt-16 p-6 bg-white dark:bg-gray-800 rounded shadow flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold mb-2 text-center">Iniciar sesión</h2>
      <input
        name="user"
        type="text"
        placeholder="Usuario"
        value={form.user}
        onChange={handleChange}
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
        required
      />
      <input
        name="pass"
        type="password"
        placeholder="Contraseña"
        value={form.pass}
        onChange={handleChange}
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
        required
      />
      {error && (
        <div className="text-red-500 text-sm text-center">{error}</div>
      )}
      <button
        type="submit"
        className="bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition"
        disabled={loading}
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
