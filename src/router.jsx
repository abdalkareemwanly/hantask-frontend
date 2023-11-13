import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./admin/Components/DefaultLayout";
import Index from "./admin/pages/index/Index";
import Languages from "./admin/pages/Languages/Languages";
import Pagenotfound from "./Components/Pagenotfound";
import Users from "./admin/pages/users/Users";
import EditWord from "./admin/pages/Languages/EditWord";
import AdminLogin from "./admin/pages/Auth/admin/AdminLogin";
import AdminLogout from "./admin/pages/Auth/admin/AdminLogout";
import ArchivedUsers from "./admin/pages/users/ArchivedUsers";
import Categories from "./admin/pages/categories/Categories";
const router = createBrowserRouter([
  {
    path: "/admin/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Index />,
      },
      { path: "/admin/dashboard/users", element: <Users /> },
      { path: "/admin/dashboard/archivedUsers", element: <ArchivedUsers /> },
      { path: "/admin/dashboard/categories", element: <Categories /> },

      {
        path: "/admin/logout",
        element: <AdminLogout />,
      },
      {
        path: "/admin/EditWord",
        element: <EditWord />,
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
