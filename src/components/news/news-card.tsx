"use client";

import React from "react";
import Card from "@/components/card/Card";

import styles from "./news-card.module.css";

interface News {
  id: number;
  attributes: {
    created: string;
    title: string;
    field_ingress: string;
  };
}

const getNewsData = async (): Promise<News[]> => {
  const response = await fetch("/api/news", {
    method: "GET",
  });

  const data = await response.json();
  return data.data;
};

const NewsCard = () => {
  const [newsData, setNewsData] = React.useState<News[] | undefined>(undefined);

  React.useEffect(() => {
    const fetchData = async () => {
      const news = await getNewsData();
      setNewsData(news);
    };

    // Fetch data initially
    fetchData();

    // Fetch data every half hour
    const interval = setInterval(fetchData, 1800000);

    return () => clearInterval(interval);
  }, []);

  const getDay = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    return day;
  };

  const getMonth = (date: string) => {
    const dateObj = new Date(date);
    const month = new Intl.DateTimeFormat("no-NB", { month: "short" }).format(
      dateObj
    );
    return month;
  };

  return (
    <Card>
      <h2>Siste nytt</h2>
      <ul className={styles.list}>
        {newsData?.map((news) => (
          <li key={news.id} className={styles.listItem}>
            <div className={styles.date}>
              <span className={styles.day}>
                {getDay(news.attributes.created)}
              </span>
              <span className={styles.month}>
                {getMonth(news.attributes.created)}
              </span>
            </div>
            <div className={styles.listElement}>
              <h3 className={styles.newsTitle}>{news.attributes.title}</h3>
              <p className={styles.newsIngress}>
                {news.attributes.field_ingress}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default NewsCard;
