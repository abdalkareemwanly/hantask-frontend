import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Components/DefaultLayout";
import Index from "./views/Index";
import ChatUsers from "./views/ChatUsers";


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
