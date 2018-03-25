/* @flow */
import 'babel-polyfill'
import React from 'react'

// Libraries
import renderViews from '~/entrypoints/lib/renderViews'
import ViewAdapter from '~/adapter/viewAdapter'
import configureStore from '~/port/store/configureStore'
import runRootSaga from '~/adapter/processAdapter/lib/runRootSaga'
import { sagaMiddleware } from '~/adapter/processAdapter'
import extendReducers from '~/port/lib/extendReducers'

// RootView
import ReactSignupView from '~/presentation/views/modules/signup'

// Reducers
import { reducer as formReducer } from 'redux-form'
import { reducer as CommonReducer } from '~/port/redux/common'
import { reducer as CustomerReducer } from '~/port/redux/packages/customer'

// ViewModels
import CommonViewModel from '~/domain/Common/CommonView'
import CustomerViewModel from '~/domain/Customer/CustomerView'

// Sagas
import commonSaga from '~/adapter/processAdapter/services/common'
import customerSaga from '~/adapter/processAdapter/services/customer'

// Main
const rootReducer = extendReducers({
  commonVM: CommonReducer(new CommonViewModel()),
  customerVM: CustomerReducer(new CustomerViewModel()),
  form: formReducer
})

const store = configureStore(rootReducer)

const ViewAdaptedStore = () => {
  return (
    <ViewAdapter store={store}>
      <ReactSignupView />
    </ViewAdapter>
  )
}

renderViews('data-react-signup-app', ViewAdaptedStore)
runRootSaga(sagaMiddleware)([commonSaga, customerSaga])
