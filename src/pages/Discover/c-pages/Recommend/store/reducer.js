import * as actionTypes from "./constants";
import { Map } from "immutable";
/* Map类似对象 */
const defaultState = Map({
    topBanners: [],
    hotRecommends: [],
    newAlbums: [],

    settleSings: [],
})
/* reducer根据action 修改state */
function reducer(state = defaultState, action){
   
    switch(action.type){
        case actionTypes.CHANGE_TOP_BANNERS:
            return state.set("topBanners", action.topBanners);
        case actionTypes.CHANGE_HOT_RECOMMEND:
            return state.set("hotRecommends", action.hotRecommends);
        case actionTypes.CHANGE_NEW_ALBUM:
            return state.set("newAlbums", action.newAlbums);
        case actionTypes.CHANGE_SETTLE_SONGER:
            return state.set("settleSings", action.settleSings);
        default:
            return state;
    }
    
}

export default reducer;