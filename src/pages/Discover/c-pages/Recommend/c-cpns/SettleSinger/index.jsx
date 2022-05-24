import React, { memo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { NavLink } from "react-router-dom";

import { getSettleSingers } from "../../store/actionCreator";
import { getSizeImage } from "@/utils/Rec-format";
import ThemeHeaderSmall from "@/components/ThemeHeaderSmall";
import { SetterSongerWrapper }  from "./style";
export default memo(function SettleSinger() {
    // 获取store中settleSings中数据
    const { settleSings } = useSelector((state) => ({
        settleSings: state.getIn(["recommend", "settleSings"]),
    }))
    const dispatch = useDispatch();
    // 副作用函数，请求一次数据
    useEffect(() => {
        dispatch(getSettleSingers(5, 5));
    }, [dispatch])
    return (
        <SetterSongerWrapper>
            <ThemeHeaderSmall title="入住歌手" more="参看全部"/>
            <div className="singer-list">
                {settleSings && settleSings.map((item) => {
                    return (
                        <NavLink 
                            to={`/user/home?id=${item.id}`}
                            key={item.id}
                            className="item"
                        >
                            <img src={getSizeImage(item.picUrl)} alt=""/>
                            <div className="info">
                                <div className="title">{item.name}</div>
                                <div className="name">{item.name}</div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
            <div className="apply-for">
                <a
                    href="https://music.163.com/st/musician"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    申请成为网易音乐人
                </a>
            </div>
        </SetterSongerWrapper>
    )
})