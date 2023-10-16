import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./admin/Components/DefaultLayout";
import Index from "./admin/index/Index";
import ChatUsers from "./admin/ChatUsers/ChatUsers";


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/Dashboard',
        element: <Index />
      },
      {
        path: "/Chat Users",
        element: <ChatUsers />
      }
    ]
  }
])

export default router;
