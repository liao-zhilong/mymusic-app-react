import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
/* 导入走马灯组件 */
import { Carousel } from "antd";

import { getTopBannerAction } from "../../store/actionCreator";

import { BannerWrapper, BannerLeft, BannerRight, BannerControl} from "./style"

/*  轮播图组件 横幅 */
function TopBanner() {
    //组件自己的hooks
 
    const [current, setCurrent] = useState(0);

    const dispatch = useDispatch();

    //从store中提取数据, 获取轮播图图片数据
    const { topBanners } = useSelector(
        (state) => ({
            // topBanners: state.recommend.topBanners,//普通读取数据方法
            // topBanners: state.get("recommend").get("topBanners"), ImmutableJS读取数据方法
            topBanners: state.getIn(["recommend", "topBanners"]),
        }),
        shallowEqual
    )
   
    
    const bannerRef = useRef();
    //dispatch值变化时执行action函数
    //现在useEffect不依赖count，依赖的是dispatch，而dispatch在每次render之后都是不变的，所以就不会每次render之后都清除计时器再重新设置计时器
    // 其实这里把dependency数组设为[]也是完全一样的
    useEffect(() => {
        dispatch(getTopBannerAction());
    }, []);

    const previous = () => {
        bannerRef.current.prev();
    }

    const next = () => {
        bannerRef.current.next();
    }

    const bannerChange = (from, to) => {
        setCurrent(to);
    }

    //从后台接收，毛玻璃背景图，传递给props,"?imageView&blur=40x20"设置模糊背景
    const bgImage = topBanners[current] && topBanners[current].imageUrl + "?imageView&blur=40x20";
 
  
    return (
        <BannerWrapper bgImage={bgImage}>
            <div className="banner wrap-v2">
                <BannerLeft>
                    <Carousel
                        effect="fade"
                        autoplay
                        ref={bannerRef}
                        beforeChange={bannerChange}
                    >
                    {topBanners.map((item) => {
                        return (
                            <div className="banner-item" key={item.imageUrl}>
                                <img 
                                    className="image"
                                    src={item.imageUrl}
                                    alt={item.typeTitle}
                                />
                            </div>
                        )
                    })}
                    </Carousel>
                </BannerLeft>
                <BannerRight>
                    <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                </BannerRight>
                <BannerControl>
                    <button className="btn left" onClick={ previous }></button>
                    <button className="btn right" onClick={ next }></button>
                </BannerControl>
            </div>
        </BannerWrapper>
    )
};


export default memo(TopBanner)
