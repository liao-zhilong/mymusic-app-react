//引入createStore，专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware, compose } from "redux";
////引入redux-thunk，用于支持异步action
import thunk from "redux-thunk";
import reducer from './reducer.js';

//  composeEnhancers函数--redux开发工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const storeEnhancer = applyMiddleware(thunk);

const store = createStore(reducer, composeEnhancers(storeEnhancer));

export default store;