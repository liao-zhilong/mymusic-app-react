// 热门推荐展示模块
import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import { SongsCoverWrapper } from "./style";
import { getCount, getSizeImage } from "@/utils/Rec-format";

export default memo(function SongsCover(props) {
    const { info } = props;
    return (
        <SongsCoverWrapper>
            <NavLink to={`/playlist?id=${info.id}`}>
                <div className="cover-top" title={info.name}>
                    <img src={ getSizeImage(info.picUrl, 140)} alt={ info.name } />
                    <div className="cover sprite_cover">
                        <div className="info sprite_cover">
                            <span>
                                <i className="sprite_icon erji"></i>
                                {getCount(info.playCount)}
                            </span>
                            <i className="sprite_icon play"></i>
                        </div>
                    </div>
                </div>
                <div className="cover-bottom text-nowrap">{info.name}</div>
                <div className="cover-source text-nowrap">
                 {/* 这个好像没有数据 */}
                    by {info.copywriter || (info.creator && info.creator.nickname)}
                </div>
            </NavLink>
        </SongsCoverWrapper>
    )
})