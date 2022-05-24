import { notification } from "antd";

import * as actionTypes from "./constants";
import {
    getTopBanners,
    getHotRecommends,
    getNewAlbum,
    getArtistList,
} from "@/service/recommend"
import { responsiveMap } from "antd/lib/_util/responsiveObserve";

/* 异步请求轮播图数据 */
export const changeTopBannerAction = (res) => ({
    type: actionTypes.CHANGE_TOP_BANNERS,
    topBanners: res.banners,
});

export const getTopBannerAction = () => {
    return async (dispatch) => {
        /* 请求轮播图数据 */
        const res = await getTopBanners();
        /* 发出action */
        dispatch(changeTopBannerAction(res));
    }
}

/* 异步请求热门推荐数据 */
export const changeHotRecommendAction = (res) => ({
    type: actionTypes.CHANGE_HOT_RECOMMEND,
    hotRecommends: res.result,
})

export const getHotRecommendAction = (limit) => {
    return async(dispatch) => {
        const res = await getHotRecommends(limit);
        dispatch(changeHotRecommendAction(res));
    }
}

// 异步请求新碟上架数据
// 箭头函数后面返回的是一个对象
export const changeNewAlbumAction = (res) => ({
    type: actionTypes.CHANGE_NEW_ALBUM,
    newAlbums: res.albums,
})
export const getNewAlbumAction = (limit) => {
    return async (dispatch) => {
        const res = await getNewAlbum(limit);
        dispatch(changeNewAlbumAction(res));
    }
}

// 异步请求入驻歌手数据--then链式调用
const changeSettleSingsAction = (res) => ({
    type: actionTypes.CHANGE_SETTLE_SONGER,
    settleSings: res.artists,
})
// 请求得到的数据将数据放入store
export const getSettleSingers = (limit, cat) => {
    return (dispatch) => {
        getArtistList(limit, cat).then((res) => {
            dispatch(changeSettleSingsAction(res));
        })
    }
}