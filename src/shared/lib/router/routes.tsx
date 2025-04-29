import { Auth } from "../../../pages/auth";
import { News } from "../../../pages/news";
import { Schedule } from "../../../pages/schedule";
import { Header } from "../../../widgets/header";

enum AppRoutes {
  ROOT = "/",
  LOGIN = "/login",
  REGISTRATION = "/registration",
  NEWS = "/news",
  SCHEDULE = "/schedule",
}

const RouteComponents = {
  [AppRoutes.ROOT]: <Header />,
  [AppRoutes.LOGIN]: <Auth />,
  [AppRoutes.REGISTRATION]: <Auth />,
  [AppRoutes.NEWS]: <News />,
  [AppRoutes.SCHEDULE]: <Schedule />,
};

export { AppRoutes, RouteComponents };
