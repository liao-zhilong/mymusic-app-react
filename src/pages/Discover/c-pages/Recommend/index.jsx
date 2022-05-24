import React, { memo } from "react";

import TopBanner from "./c-cpns/TopBanner";
import HotRecommend from "./c-cpns/HotRecommend";
import NewAlbum from "./c-cpns/NewAlbum";
import UserLogin from "./c-cpns/UserLogin";
import SettleSinger from "./c-cpns/SettleSinger";
import { Content, RecommendLeft, RecommendRight } from "./style";

function Recommend(){
    return (
        <div>
            <TopBanner />
            <Content>
                <RecommendLeft>
                    <HotRecommend />
                    <NewAlbum />
                </RecommendLeft>
                <RecommendRight>
                    <UserLogin />
                    <SettleSinger />
                </RecommendRight>
            </Content>
        </div>
    )
}

export default memo(Recommend)