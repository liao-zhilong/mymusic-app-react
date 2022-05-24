import { getSongDetail, getLyric } from "@/service/player";
import { parseLyric } from "@/utils/Rec-format";
import * as actionTypes from "./constants";
// 改变当前播放列表的播放歌曲
const changeCurrentSongAction = (currentSong) => ({
    type: actionTypes.CHANGE_CURRENT_SONG,
    currentSong,
});
//改变当前的播放列表
const changePlayListAction = (playList) => ({
    type: actionTypes.CHANGE_PLAY_LIST,
    playList,
});

// 改变当前播放歌曲在播放列表的索引值
const changeCurrentSongIndexAction = (index) => ({
    type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
    index,
})

// 改变当前的歌词
const changeLyricListAction = (lyricList) => ({
    type: actionTypes.CHANGE_LYRIC_LIST,
    lyricList,
});
// 获取歌曲的歌词
export const getLyricAction = (id) => {
    return (dispatch) => {
        getLyric(id).then((res) => {
            const lyric = res.lrc.lyric;
            const lyricList = parseLyric(lyric);
            dispatch(changeLyricListAction(lyricList));
        })
    }
}

// 异步请求当前播放的歌曲
export const getSongDetailAction = (ids) => {
    return async (dispatch, getState) => {
        // 1.获取数据，根据id查找playList中是否已经有了该歌曲
        const playList = getState().getIn(["player", "playList"]) || [];
        const songIndex = playList && playList.findIndex((song) => song.id === ids);

        // 2.判断是否找到歌曲
        let song = null;
        if(songIndex !== -1){
            song = playList && playList[songIndex];

            dispatch(changeCurrentSongAction(song));
        }else{
            //没有找到歌曲，请求歌曲数据
            const res = await getSongDetail(ids);
            song = res.songs && res.songs[0];
            if(!song) return;

            // 1.将最新请求到的歌曲添加到播放列表中
            const newPlayList = [...playList, song];
            // 2.更新redux中的值
            dispatch(changePlayListAction(newPlayList))
            dispatch(changeCurrentSongAction(song));
        }
    }
}

// 点击左右按钮，切换播放歌曲
export const changeCurrentIndexAndSongAction = (tag) => {
    return (dispatch, getState) => {
        const playList = getState().getIn(["player", "playList"]);
        const sequence = getState().getIn(["player", "sequence"]);
        let currentSongIndex = getState().getIn(["player", "currentSongIndex"]);

        switch (sequence) {
            case 1:  //
                break;
            default:
                // 其他情况，即单曲或循环播放时
                currentSongIndex = currentSongIndex + tag;
                if(currentSongIndex >= playList.length){
                    currentSongIndex = 0;
                }
                if(currentSongIndex < 0){
                    currentSongIndex = playList.length - 1;
                }
        }
        const currentSong = playList[currentSongIndex];
        dispatch(changeCurrentSongAction(currentSong));
        dispatch(changeCurrentSongIndexAction(currentSongIndex));
        //请求歌词
        dispatch(getLyricAction(currentSong.id));
    }
}