import React, { memo, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";

import { getSizeImage } from "@/utils/Rec-format";
import { InfoWrapper, InfoLeft } from "./style";
import SongOperationBar from '@/components/SongOperationBar';

export default memo(function PlayerInfo(props) {
    // const [isSpread, setIsSpread ] = useState(false);

    const { currentSong, lyricList } = useSelector(state => ({
        currentSong: state.getIn(["player", "currentSong"]),
        lyricList: state.getIn(["player", "lyricList"])
    }), shallowEqual);

    const totalLyricCount = isSpread ? lyricList.length : 13;
    console.logo(lyricList)
    return (
        <InfoWrapper>
            <InfoLeft>
                <div className="image">
                    <img src={getSizeImage(currentSong && currentSong.al && currentSong.al.picUrl, 130)} alt=""/>
                    <span className="cover image_cover"></span>
                </div>
            </InfoLeft>
        </InfoWrapper>
    )
    
})