import { useNavigate } from "react-router";

 
export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>

      <h2 className="text-2xl font-semibold mb-2">
        Página no encontrada
      </h2>

      <p className="text-muted-foreground mb-6">
        La ruta que estás buscando no existe o fue movida.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
        >
          Volver
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-md bg-primary text-white hover:opacity-90"
        >
          Ir al inicio
        </button>
      </div>
    </div>
  );
}
