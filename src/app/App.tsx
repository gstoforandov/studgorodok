import { RouterProvider } from 'react-router'
import { appRouter } from '../shared/lib/router'

import style from './styles/style.module.scss'
import { Provider } from 'react-redux'
import { store } from '../store/store'

const App = () => {

  return (
    <div className={style.app}>
      <Provider store={store}>
        <RouterProvider router={appRouter()}/>
      </Provider>
    </div>
  )
}

export default App
