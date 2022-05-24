// 新碟上架共用模板
import React, {memo} from "react";
import { NavLink } from "react-router-dom";
import { AlbumWrapper } from "./style";

import {getSizeImage} from "@/utils/Rec-format"
export default memo(function AlbumCover(props) {
    // 接收props数据并结构，且为其设默认值
    const { info, size = 130, width = 153, bgp = "-845px"} = props;
    return (
        <AlbumWrapper size={size} width={width} bgp={bgp}>
            <div className="album-image">
                <img src={getSizeImage(info.picUrl, size)} alt="" />
                {/* image_cover设置图片下放一个黑色光碟 */}
                <NavLink to={`/album?id=${info.id}`} className="cover image_cover">
                    {info.name}
                </NavLink>
            </div>
            <div className="album-info">
                <NavLink className="name text-nowrap" to={`/album?id=${info.id}`}>
                    {info.name}
                </NavLink>
                <NavLink className="artist text-nowrap" to={`/artist?id=${info.artist.id}`}>
                    {info.artist.name}
                </NavLink>
            </div>
        </AlbumWrapper> 
    );
});