import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./admin/Components/DefaultLayout";
import Index from "./admin/index/Index";
import ChatUsers from "./admin/ChatUsers/ChatUsers";
import Languages from "./admin/Languages/Languages";
import Pagenotfound from "./admin/Components/Pagenotfound";


const router = createBrowserRouter([
  {
    path: '/admin/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/admin/Dashboard',
        element: <Index />
      },
      {
        path: "/admin/Chat Users",
        element: <ChatUsers />
      },
      {
        path: "/admin/Languages",
        element: <Languages />
      }
    ]
  },{
    path: "*",
    element: <Pagenotfound />
  }
])

export default router;
