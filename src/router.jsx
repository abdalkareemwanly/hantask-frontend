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
        path: "/admin/dashboard",
        element: <Index />,
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
    path: "*",
    element: <Pagenotfound />,
  },
]);

export default router;
