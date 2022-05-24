import React, { memo } from "react";
import { Spin } from "antd";

import {LoadingWrapper } from "./style";
// 加载组件前动画
export default memo(function Loading() {
    return (
        <LoadingWrapper>
            <div>
                <Spin size="large"/>
            </div>
            <div className="fontLoading">...loading</div>
        </LoadingWrapper>
    )
})