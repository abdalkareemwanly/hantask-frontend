import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./admin/Components/DefaultLayout";
import Index from "./admin/pages/index/Index";
import ChatUsers from "./admin/pages/ChatUsers/ChatUsers";
import Languages from "./admin/pages/Languages/Languages";
import Pagenotfound from "./Components/Pagenotfound";
const router = createBrowserRouter([
  {
    path: "/admin/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/admin/Dashboard",
        element: <Index />,
      },
      {
        path: "/admin/Chat Users",
        element: <ChatUsers />,
      },
      {
        path: "/admin/Languages",
        element: <Languages />,
      },
    ],
  },
  {
    path: "*",
    element: <Pagenotfound />,
  },
]);

export default router;
