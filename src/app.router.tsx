import { createBrowserRouter, Navigate } from "react-router";
//import { SociosPage } from "./central/pages/Socios/SociosPage";
import { CentralLayout } from "./central/layouts/CentralLayout";
import { RequireAuth } from "./auth/RequireAuth";
import { AuthLayout } from "./auth/layout/AuthLayout";
import { LoginPage } from "./auth/page/LoginPage";
import { InicioPage } from "./central/pages/InicioPage";
import { DashBoardSocios } from "./central/pages/Socios/dashboards/DashBoardSocios";
import { DashBoardSocios2 } from "./central/pages/Socios/dashboards/DashBoardSocios2";
import NotFoundCentralPage from "./central/pages/NotFoundCentralPage";
import NotFoundPage from "./central/pages/NotFoundPage";

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
      // /central -> /central/inicion (o dashboard)
      { index: true, element: <Navigate to="inicio" replace /> },
      { path: "socios", element: <InicioPage /> },
      { path: "dashp", element: <DashBoardSocios /> },
      { path: "dashs", element: <DashBoardSocios2 /> },
        //  404 dentro del layout Central
      { path: "*", element: <NotFoundCentralPage /> },
      // futuras:
      // { path: "beneficiarios", element: <BeneficiariosPage /> },
      // { path: "productos", element: <ProductosPage /> },
    ],
  },

  // 404
  { path: "*", element: <NotFoundPage />, },
])