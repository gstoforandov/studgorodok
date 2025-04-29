import { Auth } from "../../../pages/auth";
import { Login } from "../../../pages/auth/Login";
import CanteenMenu from "../../../pages/canteen";
import { News } from "../../../pages/news";
import { Schedule } from "../../../pages/schedule";
import { Header } from "../../../widgets/header";

enum AppRoutes {
  ROOT = "/",
  LOGIN = "/login",
  REGISTRATION = "/registration",
  NEWS = "/news",
  SCHEDULE = "/schedule",
  CANTEEN = "/canteen",
}

const RouteComponents = {
  [AppRoutes.ROOT]: <Header />,
  [AppRoutes.LOGIN]: <Login />,
  [AppRoutes.REGISTRATION]: <Auth />,
  [AppRoutes.NEWS]: <News />,
  [AppRoutes.SCHEDULE]: <Schedule />,
  [AppRoutes.CANTEEN]: <CanteenMenu />,
};

export { AppRoutes, RouteComponents };
