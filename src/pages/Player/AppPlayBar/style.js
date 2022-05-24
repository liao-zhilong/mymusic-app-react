import styled from "styled-components";

export const PlayBarWrapper = styled.div`
    position: fixed;
    z-index: 99;
    left: 0;
    right: 0;
    bottom: 0;
    height: 52px;
    background-position: 0 0;
    background-repeat: repeat;

    .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        height: 47px;
    }
`;

export const Control = styled.div`
    display: flex;
    align-items: center;
    .prev,
    .next {
        width: 28px;
        height: 28px;
    }
    .prev {
        ${'' /* 设置背景图像的起始位置 */}
        background-position: 0 -130px;
        &:hover {
            background-position: -30px -130px;
            cursor: pointer;
        }
    }
    .play {
        width: 36px;
        height: 36px;
        margin: 0 8px;
        background-position: 0 ${(props) => (props.isPlaying ? "-165px" : "-204px")};

        &:hover {
            background-position: -40px
            ${(props) => (props.isPlaying ? "-165px" : "-204px")};
            cursor: pointer;
        }
    }

    .next {
        background-position: -80px -130px;
        &:hover {
            background-position: -110px -130px;
            cursor: pointer;
        }
    }
`;

export const PlayInfo = styled.div`
    display: flex;
    width: 642px;
    align-items: center;

    .image {
        width: 34px;
        height: 34px;
        border-radius: 5px;
    }

    .info {
        flex: 1;
        color: #a1a1a1;
        margin-left: 10px;

        .song {
            color: #e1e1e1;
            position: relative;
            top: 8px;
            left: 8px;
            .song-name {
                color: #e8e8e8;
                margin-left: 10px;
            }
            .singer-name {
                color: #a1a1a1;
                margin-left: 10px;
            }
        }

        .progress {
            display: flex;
            align-items: center;
            .ant-slider {
                width: 493px;
                margin-right: 10px;

                .ant-slide-rail {
                    height: 9px;
                    background: url(${require("@/assets/img/progress_bar.png")}) right 0;
                }
                .ant-slide-track {
                    height: 9px;
                    background: url(${require("@/assets/img/progress_bar.png")}) left -66px;
                }
                .ant-slider-handle {
                    width: 22px;
                    height: 24px;
                    border: none;
                    margin-top: -7px;
                    background: url(${require("@/assets/img/sprite_icon.png")}) 0 -250px;
                }
            }

            .time {
                .now-time {
                    color: #e1e1e1;
                }
                .dividers {
                    margin: 0 3px;
                }
            }
        }     
    }
    
`;