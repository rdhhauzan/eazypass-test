import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import TypeList from "../pages/TypeList";
import Upload from "../pages/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/type",
    element: <TypeList />,
  },
]);

export default router;
