import { createBrowserRouter } from "react-router";
import { AppRoutes, RouteComponents } from "./routes";

const appRouter = () =>
  createBrowserRouter([
    {
      path: AppRoutes.ROOT,
      element: RouteComponents[AppRoutes.ROOT],
      children: [
        {
          path: AppRoutes.NEWS,
          element: RouteComponents[AppRoutes.NEWS],
        },
        {
          path: AppRoutes.SCHEDULE,
          element: RouteComponents[AppRoutes.SCHEDULE],
        },
        {
          path: AppRoutes.CANTEEN,
          element: RouteComponents[AppRoutes.CANTEEN],
        },
      ],
    },
    {
      path: AppRoutes.LOGIN,
      element: RouteComponents[AppRoutes.LOGIN],
    },
    {
      path: AppRoutes.REGISTRATION,
      element: RouteComponents[AppRoutes.REGISTRATION],
    },
  ]);

export { appRouter };
