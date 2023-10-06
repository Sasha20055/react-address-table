import React from 'react'
import MainBodyContainer from './Components/MainBody/MainBodyContainer';
import './App.sass'
import store from './redux/Store';
import { Provider } from "react-redux";
import { YMaps } from '@pbe/react-yandex-maps';

const App = React.memo(() => {
  return (
    <YMaps query={{
      apikey: "b46407c0-2de2-4342-a545-5a4593b0d161",
      load: "package.full"
    }}>
      <Provider store={store} >
        <div className="Wrapper">
          <MainBodyContainer />
        </div>
      </Provider >
    </YMaps>
  )
})

export default App;