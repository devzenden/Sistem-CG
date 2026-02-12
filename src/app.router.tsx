import { createBrowserRouter, Navigate } from "react-router";
import { SociosPage } from "./central/pages/Socios/SociosPage";
import { CentralLayout } from "./central/layouts/CentralLayout";
import { RequireAuth } from "./auth/RequireAuth";
import { AuthLayout } from "./auth/layout/AuthLayout";
import { LoginPage } from "./auth/page/LoginPage";

export const appRouter = createBrowserRouter([
   // raíz -> login
 {
  path: "/",
  element: <AuthLayout />,
  children: [
    { index: true, element: <LoginPage /> }
  ]
    },
  // central (protegido)
  {
    path: "/central",
    element: (
      <RequireAuth>
        <CentralLayout />
      </RequireAuth>
    ),
    children: [
      // /central -> /central/socios (o dashboard)
      { index: true, element: <Navigate to="socios" replace /> },

      { path: "socios", element: <SociosPage /> },

      // futuras:
      // { path: "beneficiarios", element: <BeneficiariosPage /> },
      // { path: "productos", element: <ProductosPage /> },
    ],
  },

  // 404
  { path: "*", element: <Navigate to="/" replace /> },
])