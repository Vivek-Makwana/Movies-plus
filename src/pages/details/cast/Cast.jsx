import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/img";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                    {/* {console.log("Thedata", data)} */}
                        {data?.map((i)=>{
                            let imgUrl = i.profile_path ? url.profile + i.profile_path :avatar;
                            return(
                                <div key={i.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl}/>
                                    </div>
                                    <div className="name">
                                        {i.name}
                                    </div>
                                    <div className="character">
                                        {i.character}
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;