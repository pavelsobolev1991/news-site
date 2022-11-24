import React, { useEffect, useState } from "react";
import { NewsProps } from "../../types";
import "./News.scss";

interface INews {
  news?: NewsProps;
  mainnews?: NewsProps;
  first?: boolean;
}

const News: React.FC<INews> = ({ news, mainnews, first }: any) => {
  // console.log('check',first)
  return (
    <>
      {first ? (
        <div className={news ? "news" : "news__sidebar"}>
          <div className={news ? "news" : "news__body"}>
          <div className="news__img__firstwrap">
                  <img
                    src={news?._embedded["wp:featuredmedia"][0].source_url}
                    className="news__img__first"
                  />
                </div>
            <a href="#" className="news__link__first">
              {news ? news.title.rendered : mainnews.title.rendered}
            </a>
            <>
              {news ? (
                <p className="news__time">{news?.date.slice(11, 16)}</p>
              ) : null}
            </>
          </div>
        </div>
      ) : null}
      
      <div className={news ? "news" : "news__sidebar"}>
        <div className={news ? "news" : "news__body"}>
          <a href="#" className="news__link">
            {news ? news.title.rendered : mainnews.title.rendered}
          </a>
          <>
            {news ? (
              <p className="news__time">{news?.date.slice(11, 16)}</p>
            ) : null}
            {mainnews ? (
              <div className="news__img__wrap">
                {" "}
                <img
                  src={mainnews?._embedded["wp:featuredmedia"][0].source_url}
                  className="news__img"
                />{" "}
              </div>
            ) : null}
          </>
        </div>
      </div>
    </>
  );
};

export default News;
