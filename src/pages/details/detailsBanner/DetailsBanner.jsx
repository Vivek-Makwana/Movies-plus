import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";


const DetailsBanner = ({ video, crew }) => {
const [show, setShow] = useState(false);
const [videoId, setVideoid] = useState(null);

    const {mediaType, id} = useParams();
    const {data, loading} = useFetch(`/${mediaType}/${id}`)
    const {url} = useSelector((state)=> state.home)
    const _genres = data?.genres?.map((g)=>g.id) 
    const director = crew?.filter((t)=>t.job==="Director")
    const writer = crew?.filter((t)=>t.job==="Screenplay" || t.job==="Story" || t.job==="Writer")
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        
        <div className="detailsBanner">
            {!loading ? (<>{!!data && (
            <>
            <div className="backdrop-img">
            <Img src={url.backdrop + data.backdrop_path}/>
            </div>
            <div className="opacity-layer"></div>
            <ContentWrapper>
            <div className="content">
                        <div className="left">
                            {data.poster_path ? (
                                <Img className="posterImg" src={url.backdrop + data.poster_path}/>
                            ) : (<Img className="posterImg" src={PosterFallback}/>)}
                        </div>
                        <div className="right">
                            <div className="title">
                                {`${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})`}
                            </div>
                            <div className="subtitle">
                                {data.tagline}
                            </div>
                            <Genres data={_genres}/>
                            <div className="raw">
                                <CircleRating rating={data.vote_average.toFixed(1)}/>
                                <div style={{display:"flex"}}>
                                <div className="playbtn" onClick={()=>{setShow(true); setVideoid(video.key)}}>
                                    <PlayIcon/>
                                    <span className="text">Watch Trailer</span>
                                </div>
                                    <button className="watch">Watch Now</button>
                                </div>
                                
                                
                                
                            </div>
                            <div className="overview">
                                <div className="heading">Overview</div>
                                <div className="description">{data.overview}</div>
                            </div>
                            <div className="info">
                                {data.status && (
                                    <div className="infoItem">
                                    <span className="text bold">Status:{" "}</span>
                                    <span className="text">{data.status}</span>
                                    </div>
                                ) }
                                {data.release_date && (
                                    <div className="infoItem">
                                    <span className="text bold">Relese Date:{" "}</span>
                                    <span className="text">{dayjs(data.release_date).format("D MMM, YYYY")}</span>
                                    </div>
                                ) }
                                {data.runtime && (
                                <div className="infoItem">
                                <span className="text bold">Duration:{" "}</span>
                                <span className="text">{toHoursAndMinutes(data.runtime)} </span>
                                </div>
                                ) }
                            </div>
                            {director?.length > 0 && (
                                <div className="info">
                                    <span className="text bold">
                                        Director: {" "}
                                    </span>
                                    <span className="text">
                                        {director?.map((t,i)=>(
                                            <span key={i}>
                                                {t.name}
                                                {director.length-1 !==i && ", "}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )}
                            {writer?.length > 0 && (
                                <div className="info">
                                    <span className="text bold">
                                        Writer: {" "}
                                    </span>
                                    <span className="text">
                                        {writer?.map((t,i)=>(
                                            <span key={i}>
                                                {t.name}
                                                {writer.length-1 !==i && ", "}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )}
                            {data?.created_by?.length > 0 && (
                                <div className="info">
                                    <span className="text bold">
                                        Creator: {" "}
                                    </span>
                                    <span className="text">
                                        {data?.created_by?.map((t,i)=>(
                                            <span key={i}>
                                                {t.name}
                                                {data?.created_by.length-1 !==i && ", "}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )}
                            
                        </div>
                    </div>
                    <VideoPopup
                        show={show}
                        setShow={setShow}
                        videoId={videoId}
                        setVideoId={setVideoid}
                    />
                </ContentWrapper>
                    </>
                )}
               </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;