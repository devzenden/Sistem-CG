import { useNavigate } from "react-router";

 

export default function NotFoundCentralPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">404</h1>
      <p className="text-muted-foreground mb-6">
        Esta sección no existe dentro de Central.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-md border"
        >
          Volver
        </button>

        <button
          onClick={() => navigate("/central")}
          className="px-4 py-2 rounded-md bg-primary text-white"
        >
          Ir al inicio de Central
        </button>
      </div>
    </div>
  );
}