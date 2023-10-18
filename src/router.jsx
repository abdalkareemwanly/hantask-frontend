import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Components/DefaultLayout";
import Index from "./views/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/index",
        element: <Index />,
      },
    ],
  },
]);

export default router;
