//音乐播放组件
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Slider } from "antd";
import { NavLink } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { PlayBarWrapper, Control, PlayInfo } from "./style";

import {
    changeCurrentIndexAndSongAction,
    getSongDetailAction
} from "../store/actionCreator"
import { getPlaySong, getSizeImage, formatMinuteSecond  } from "@/utils/Rec-format";
export default memo(function AppPlayBar() {

    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false); //是否正在播放

    const [progress, setProgress] = useState(0); //滑块进度
    const [changing, setChanging] = useState(false); // 是否正在滑动
    const [showPanel, setShowPanel] = useState(false); // 是否显示播放列表

    const dispatch = useDispatch();

    const {currentSong, sequence, playList, lyricList, currentLyricIndex } = useSelector(
        (state) => ({
            currentSong: state.getIn(["player", "currentSong"]),
            sequence: state.getIn(["player", "sequence"]),
            playList: state.getIn(["player", "playList"]),
            lyricList: state.getIn(["player", "lyricList"]),
        }),
        shallowEqual
    );
    // 一下渲染3次,不知道为什么
    console.log(currentSong)
    console.log(1)
    const audioRef = useRef();
    useEffect(() => {
        dispatch(getSongDetailAction(28844143));
    }, [dispatch]);

    useEffect(() => {
        /* 获取音乐播放路径 */
        audioRef.current.src = getPlaySong(currentSong && currentSong.id);
        audioRef.current.play().then(() => {setIsPlaying(true);
        })
        .catch(() => {
            setIsPlaying(false);
        })
    }, [currentSong]);
    
    //
    const picUrl = (currentSong && currentSong.al && currentSong.al.picUrl) || "";
    const songId = currentSong && currentSong.id;
    const songName = (currentSong && currentSong.name) || "未知歌曲";
    const singerId = currentSong && currentSong.ar && currentSong.ar[0].id;
    const singerName = (currentSong && currentSong.ar && currentSong.ar[0].name) || "未知歌手";
    const duration = (currentSong && currentSong.dt) || 0;
    // 将毫秒转换成对应格式mm:ss
    const showDuration = formatMinuteSecond(duration); // 总时间
    const showCurrentTime = formatMinuteSecond(currentTime);// 当前时间

    // audio时间发生变动调用该方法
    const timeUpdate = (e) => {
        const currentTimes = e.target.currentTime;
        // 自然播放，没有滑动
        if(!changing){
            // 将其转换为毫秒，并将当前时间存入state
            setCurrentTime(currentTimes * 1000);

            setProgress(((currentTimes * 1000) / duration) * 100)
        }
    }

    // 点击左右切换音乐
    const changeMusic = (tag) => {
        dispatch(changeCurrentIndexAndSongAction(tag));
    }

    //点击播放、暂停音乐按钮，并调用play/pause方法进行播放/暂停
    const playMusic = useCallback(() => {
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
    }, [isPlaying]);
    
    // 鼠标划入提示播放进度
    const formatter = (value) => {
        return `${value}`;
    }

    // 鼠标在滑条来回滑动时调用
    const slideChange = useCallback(
        (value) => {
            setChanging(true);

            const currentTimes = (value / 100) * duration;
            setCurrentTime(currentTimes);
            setProgress(value);
        },
        [duration]
    )

    // 在滚动条中弹起时调用
    const sliderAfterChange = useCallback((value) => {
        setChanging(false);
        const currentTimes = ((value / 100) * duration) / 1000;
        // 将audio当前播放时间设置为currentTimes
        audioRef.current.currentTime = currentTimes;
        setCurrentTime(currentTimes * 1000);

        if(!isPlaying) {
            playMusic();
        }
    },
    [duration, isPlaying, playMusic]
    )
    return (
        <PlayBarWrapper className="sprite_player">
            <div className="content wrap-v2">
                <Control isPlaying={isPlaying}>
                    <button
                        className="prev sprite_player"
                        onClick={(e) => changeMusic(-1)}
                    ></button>
                    <button
                        className="play sprite_player"
                        onClick={(e) => playMusic()}
                    ></button>
                    <button
                        className="next sprite_player"
                        onClick={(e) => changeMusic(1)}
                    ></button>
                </Control>
                <PlayInfo>
                    <div className="image">
                        <NavLink to={`/song?id=${songId}`}>
                            <img src={ getSizeImage(picUrl, 35)} alt=""/>
                        </NavLink>
                    </div>
                    <div className="info">
                        <div className="song">
                            <NavLink to={`/song?id=${songId}`} className="song-name">
                                {songName}
                            </NavLink>
                            <NavLink to={`/song?id=${singerId}`} className="singer-name">
                                {singerName}
                            </NavLink>
                        </div>

                        <div className="progress">
                        <Slider 
                            value={progress}
                            tipFormatter={formatter}
                            onChange={slideChange}
                            onAfterChange={sliderAfterChange}
                        />
                        <div className="time">
                            <span className="now-time">{showCurrentTime}</span>
                            <span className="dividers">/</span>
                            <span>{showDuration}</span>
                        </div>
                    </div>
                </div>   
                </PlayInfo>
            </div>
            <audio
                ref={audioRef}
                onTimeUpdate={(e) => timeUpdate(e)}
            />
        </PlayBarWrapper>
    )
})