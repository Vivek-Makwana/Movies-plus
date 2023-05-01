// import React, {useState, useEffect} from "react";
// import { useParams } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
// import './style.scss'
// import {fetchDataFromApi} from "../../utils/api"
// import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
// import MovieCard from "../../components/movieCard/MovieCard";
// import Spinner from "../../components/spinner/Spinner";
// import noResults from '../../assets/no-results.png';
// const SearchResult = () => {
//   const [data, setData] = useState(null);
//   const [pageNum, setPageNum] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const {query} = useParams();
//   const fetchInitialData = ()=>{
//     setLoading(true)
//     fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
//       // console.log("This is d Result", res)
//         setData(res)
//         setPageNum((pre)=>pre+1);
//         setLoading(false)
//     })
//   }

//   useEffect(()=>{
//     setPageNum(1);
//     fetchInitialData()},[query])
//   // console.log("this is SR", useParams())

// const fetchNextPageData=()=>{
//   fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
    
//     if(data?.results){
//       setData({
//         ...data, results: [...data?.results, ...res?.results]
//       })
//     }
//     else{
//       setData(res)
//     }
//     setPageNum((pre)=>pre+1)
// })
// }
// fetchNextPageData();

//   return (
//     <div className="searchResultsPage">
//       {loading && <Spinner initial={true}/>}
//       {!loading && (
//         <ContentWrapper>
//           {data?.results?.length>0 ? (
//             <>
//             <div className="pageTitle">
//               {`Search ${data?.total_results > 1 ? "results":"result"} of ${query}`}
//             </div>
//             <InfiniteScroll className="content" dataLength={data?.results?.length || []} next={fetchNextPageData} hasMore={pageNum <= data?.total_pages} loader={<Spinner/>}>
//               {data?.results.map((item, index)=>{
//                 if(item?.media_type==="person") return;
//                 return(
//                   <MovieCard key={index} data={item} fromSearch={true}/>
//                 )
//               })}
//             </InfiniteScroll>
//             </>
//           ):(
//             <span className="resultNotFound">
//               Sorry,Result not found!
//             </span>
//           )}
//         </ContentWrapper>
//       )}
//     </div>
//   )
// }

// export default SearchResult

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${
                                    data?.total_results > 1
                                        ? "results"
                                        : "result"
                                } of '${query}'`}
                            </div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;
