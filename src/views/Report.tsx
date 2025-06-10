import { useState } from "react";

export default function Report() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    issue: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // Aquí podrías enviar el reporte a un backend
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow text-center">
        ¡Reporte enviado! Gracias por tu ayuda.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold mb-2">Reportar un problema</h2>
      <input
        name="name"
        type="text"
        placeholder="Tu nombre"
        value={form.name}
        onChange={handleChange}
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Tu correo (opcional)"
        value={form.email}
        onChange={handleChange}
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <input
        name="issue"
        type="text"
        placeholder="Asunto del problema"
        value={form.issue}
        onChange={handleChange}
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
        required
      />
      <textarea
        name="details"
        placeholder="Describe el problema"
        value={form.details}
        onChange={handleChange}
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400 min-h-[100px]"
        required
      />
      <button
        type="submit"
        className="bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition"
      >
        Enviar reporte
      </button>
    </form>
  );
}
