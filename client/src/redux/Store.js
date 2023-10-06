import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import { compose } from "redux"; 
import mainBodyReducer from "./mainBodyReducer";



const reducers = combineReducers({
  form: formReducer,
  mainBody: mainBodyReducer
});


const store = createStore( 
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__         // Для расширения в браузере redux
      ? window.__REDUX_DEVTOOLS_EXTENSION__()   // Для расширения в браузере redux
      : (noop) => noop)                         // Для расширения в браузере redux   
);
window.__store__ = store

export default store