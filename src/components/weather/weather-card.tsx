import React from "react";
import Card from "@/components/card/Card";
import Place from "./place/place";
import Day from "./day/day";

import styles from "./weather-card.module.css";

const WeatherCard = () => {
  return (
    <Card>
      <div className={styles.weatherHeader}>
        <h2>Vêret hos oss</h2>
        <span className={styles.days}>I dag</span>
        <span className={styles.days}>
          <Day daysAhead={1} />
        </span>
        <span className={styles.days}>
          <Day daysAhead={2} />
        </span>
      </div>
      <div className={styles.weatherWrapper}>
        <Place locationName='Sogndal' lat='61.23122' long='7.10079' />
        <hr />
        <Place locationName='Leikanger' lat='61.18444' long='6.85006' />
        <hr />
        <Place locationName='Dingsøyr' lat='61.23414' long='5.58074' />
        <hr />
        <Place locationName='Halden' lat='59.12819' long='11.38502' />
      </div>
    </Card>
  );
};

export default WeatherCard;
