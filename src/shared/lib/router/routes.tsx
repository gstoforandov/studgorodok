import { Auth } from "../../../pages/auth"
import { News } from "../../../pages/news"
import { Header } from "../../../widgets/header"

enum AppRoutes {
  ROOT = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  NEWS = '/news'
}

const RouteComponents = {
  [AppRoutes.ROOT]: <Header />,
  [AppRoutes.LOGIN]: <Auth />,
  [AppRoutes.REGISTRATION]: <Auth />,
  [AppRoutes.NEWS]: <News/>
}

export {  AppRoutes, RouteComponents  }