/* 热门推荐 */
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { HOT_RECOMMEND_LIMIT } from "@/common/constants";
// 导入热门推荐模块
import ThemeHeaderRec from "@/components/ThemeHeaderRec";
import SongsCover from "@/components/SongsCover"
import { HotRecommendWrapper } from "./style";
import { getHotRecommendAction } from "../../store/actionCreator";

export default memo(function HotRecommend() {
    const dispatch = useDispatch();
    /* 获取store中的state */
    const { hotRecommends } = useSelector(
        (state) => ({
        hotRecommends: state.getIn(["recommend", "hotRecommends"]),
    }), 
        shallowEqual
    )
    useEffect(() => {
        dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT));
    }, [dispatch]);
    
    return (
        <HotRecommendWrapper>
            <ThemeHeaderRec title="热门推荐" keywords={["华语", "流行", "民谣", "摇滚", "电子"]}/>
            <div className="recommend-list">
                {hotRecommends && hotRecommends.map((item) => {
                    return <SongsCover key={item.id} info={item} />
                })}
            </div>
        </HotRecommendWrapper>
    )
})