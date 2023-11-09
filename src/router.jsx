import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./admin/Components/DefaultLayout";
import Index from "./admin/pages/index/Index";
import ChatUsers from "./admin/pages/ChatUsers/ChatUsers";
import Languages from "./admin/pages/Languages/Languages";
import Pagenotfound from "./Components/Pagenotfound";
import EditWord from "./admin/pages/Languages/EditWord";
import AdminLogin from "./admin/pages/Auth/admin/AdminLogin";
import AdminLogout from "./admin/pages/Auth/admin/AdminLogout";
const router = createBrowserRouter([
  {
    path: "/admin/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Index />,
      },
      {
        path: "/admin/logout",
        element: <AdminLogout />,
      },
      {
        path: "/admin/EditWord",
        element: <EditWord />,
      },
      {
        path: "/admin/chatUsers",
        element: <ChatUsers />,
      },
      {
        path: "/admin/languages",
        element: <Languages />,
      },
    ],
  },
  {
    path: "/admin/*",
    element: <AdminLogin />,
  },
  {
    path: "*",
    element: <Pagenotfound />,
  },
]);

export default router;
