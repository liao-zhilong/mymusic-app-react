/* 发现音乐组件 */
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { renderRoutes } from "react-router-config";

/* 导入跳转路由 */
import { dicoverMenu } from "@/common/local-data.js";
import { DiscoverWrapper, TopMenu } from "./style";

export default memo(function Discover(props) {
    /* 此路由下还有下一个路由 */
    /* 每个组件都接收了匹配自身的路由 */
    const {
        route: { routes },
    } = props;
    
    return (
        <DiscoverWrapper>
            <div className="top">
                <TopMenu className="wrap-v1">
                    {dicoverMenu.map((item) => {
                        return (
                            <div className="item" key={item.title}>
                                <NavLink to={item.link}>{item.title}</NavLink>
                            </div>
                        )
                    })}
                </TopMenu>
            </div>
            {renderRoutes(routes)}
        </DiscoverWrapper>
    )  
});