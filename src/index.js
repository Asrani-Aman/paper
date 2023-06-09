import React from 'react'
import ReactDOM from 'react-dom'
import { createHashHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
// import { logger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

import StylesLoader from './stylesLoader'
import reducers from './redux/reducers'
import sagas from './redux/sagas'
import Localization from './localization'
import Router from './router'
import * as serviceWorker from './serviceWorker'
 // mocking api
import 'services/axios/fakeApi'
import Parse from 'parse';
import { initializeParse  } from '@parse/react';

initializeParse(
  'https://pt2.b4a.io', // e.g. YOUR_APP_NAME.b4a.io
  'qZkw0r3HP50ZpZMAPO1iq2L9RMyhoDmwKhGkYD6K',
  'ju0i3X5m41RJjZgM2GKf1QB4XWD80BOm8xI1mVoP'
);
// middlewared
const history = createHashHistory()
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const middlewares = [sagaMiddleware, routeMiddleware]
// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger)
// }
const store = createStore(reducers(history), compose(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)
 
ReactDOM.render(
  <Provider store={store}>
    <StylesLoader>
      <Localization>
        <Router history={history} />
      </Localization>
    </StylesLoader>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
export { store, history }
