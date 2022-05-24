/* 创建一个reducer */
import { combineReducers } from "redux-immutable"

import { reducer as recommendReducer } from "../pages/Discover/c-pages/Recommend/store";
import { reducer as playerReducer } from "../pages/Player/store";

const reducer = combineReducers({
    recommend: recommendReducer,
    player: playerReducer,
});
export default reducer;