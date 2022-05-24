import React, { memo } from "react";
import { PlayerWrapper, PlayerLeft, } from "./style";
import PlayerInfo from "./c-cpns/PlayerInfo";
export default memo(function Player(props) {
    return (
        <PlayerWrapper>
            <div className="content wrap-v2">
                <PlayerLeft>
                    {/* <PlayerInfo /> */}
                </PlayerLeft>
            </div>
        </PlayerWrapper>
    )
})