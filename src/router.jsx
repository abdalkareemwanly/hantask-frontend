import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Components/DefaultLayout";


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/index',
      }
    ]
  }
])

export default router;
