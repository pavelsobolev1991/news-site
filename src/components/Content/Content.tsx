import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import News from "../News/News";
import { NewsProps } from "../../types";
import "./Content.scss";

type NewsListProps = NewsProps[];

const Content: React.FC = () => {
  const PAGE_SIZE = 10; // or whatever you like

  const [newsList, setNews] = useState<NewsListProps>([]);
  const [visibleNews, setVisibleNews] = useState<NewsListProps>([]);
  const [newsMainList, setMainNews] = useState<NewsListProps>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  async function fetchNews() {
    try {
      setLoading(true);
      const response = await axios.get<NewsListProps>(
        "http://turgenevmus.ru/wp-json/wp/v2/posts?per_page=20&_embed"
      );
      setNews(response.data);
      setMainNews(response.data.slice(0, 5));
      setVisibleNews(response.data.slice(0, 10));
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const numberOfItems = PAGE_SIZE * (index + 1);

    const newArray = [];

    for (let i = 0; i < newsList.length; i++) {
      if (i < numberOfItems) newArray.push(newsList[i]);
    }

    setVisibleNews(newArray);
  }, [newsList, index]);

  const arrayChunk = (arr: any, n: any) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    console.log(chunks)

    return chunks;
    
  };

  // console.log(newsList);
  return (
    <>
      <section className="infoblock">
        {loading && <p>Загрузка новостей</p>}
        <div className="infoblock__news">
          <div className="infoblock__list">
            {arrayChunk(visibleNews, 3).map((row, i) => (
              i===0 ? <div key={i} className="row mx-auto">{row.map((col:any, i:any) =>  i===0 ? <News key={col.id} news={col} first={true} /> : <News key={col.id} news={col} /> )}
           </div> : <div key={i} className="row mx-auto">{row.map((col:any, i:any) =>  <News key={col.id} news={col} /> )}
           </div>
            ))}
            {/* {visibleNews.map((news: any,i) => i===0 ? <News key={news.id} news={news} first={true} /> : <News key={news.id} news={news} /> )} */}
          </div>
          {!loading && (
            <button
              onClick={() => setIndex(index + 1)}
              className="infoblock__btn"
            >
              Все новости
            </button>
          )}
        </div>

        {!loading && (
          <div className="infoblock__sidebar">
            <p className="infoblock__header">Главные новости</p>
            {newsMainList.map((mainnews: any) => (
              <News key={mainnews.id} mainnews={mainnews} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Content;
