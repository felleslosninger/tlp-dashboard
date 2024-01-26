import React from "react";
import Image from "next/image";
import cn from "classnames";

import styles from "./place.module.css";

type PlaceProps = {
  locationName: string;
  long: string;
  lat: string;
};

const SHOW_DAYS = 3;

const Place = async ({
  locationName,
  long,
  lat,
}: PlaceProps) => {
  const sitename = "tlp-dashboard";
  const contact = "https://www.digdir.no/";

  const weatherDataRes = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${long}`,
    {
      headers: { "User-Agent": `${sitename} (${contact})` },
    }
  );

  if (!weatherDataRes.ok) {
    throw new Error(`Failed to fetch the data`);
  }

  const weatherData = await weatherDataRes.json();

  return (
    <div className={styles.weatherGroup}>
      <p className={styles.locationName}>{locationName}</p>
      {Object.keys(sortWeatherData(weatherData)).map((day, index) => {
        if (index >= SHOW_DAYS) {
          return null;
        }

        return (
          <>
            {Object.keys(sortWeatherData(weatherData)[day]).map((hour) => {
              if (hour !== "18") return null;
              const timeSeries = sortWeatherData(weatherData)[day];
              return (
                <div key={hour} className={styles.weather}>
                  <Image
                    src={"/yr_icons/" + getSymbolCode(timeSeries) + ".svg"}
                    alt={getSymbolCode(timeSeries)}
                    width={30}
                    height={30}
                  />
                  <div className={styles.temperature}>
                    <span
                      className={
                        isNegativeTemp(
                          Math.round(getLowHighTemperature(timeSeries).high)
                        )
                          ? styles.negativeTemp
                          : styles.positiveTemp
                      }
                    >
                      {Math.round(getLowHighTemperature(timeSeries).high)}°
                    </span>{" "}
                    /{" "}
                    <span
                      className={
                        isNegativeTemp(
                          Math.round(getLowHighTemperature(timeSeries).low)
                        )
                          ? styles.negativeTemp
                          : styles.positiveTemp
                      }
                    >
                      {Math.round(getLowHighTemperature(timeSeries).low)}°
                    </span>
                  </div>
                  {parseInt(getPrecipitationAmount(timeSeries)) > 0 && (
                    <span className={cn(styles.negativeTemp, styles.rain)}>
                      {getPrecipitationAmount(timeSeries)} mm
                    </span>
                  )}
                </div>
              );
            })}
          </>
        );
      })}
    </div>
  );
};

export default Place;

function sortWeatherData(weatherData: any) {
  const newObj: any = {};

  weatherData.properties.timeseries.forEach((timeSeries: any) => {
    const day = timeSeries.time.split("T")[0];
    const hour = timeSeries.time.split("T")[1].split(":")[0];

    if (!newObj[day]) {
      newObj[day] = {};
    }

    if (!newObj[day][hour]) {
      newObj[day][hour] = [];
    }

    newObj[day][hour].push(timeSeries);
  });

  return newObj;
}

function getLowHighTemperature(timeseries: any) {
  let low = 0;
  let high = 0;

  Object.keys(timeseries).forEach((hour) => {
    const temperature =
      timeseries[hour][0].data.instant.details.air_temperature;

    if (temperature < low) {
      low = temperature;
    }

    if (temperature > high) {
      high = temperature;
    }
  });

  return { low, high };
}

function getSymbolCode(timeseries: any) {
  let symbolCode = "";

  Object.keys(timeseries).forEach((hour) => {
    if (timeseries[hour][0]?.data?.next_12_hours?.summary?.symbol_code) {
      symbolCode = timeseries[hour][0].data.next_12_hours.summary.symbol_code;
    }
  });

  return symbolCode;
}

function getPrecipitationAmount(timeseries: any) {
  let total = 0;

  Object.keys(timeseries).forEach((hour) => {
    if (parseInt(hour) < 24) {
      if (
        timeseries[hour][0]?.data?.next_1_hours?.details?.precipitation_amount
      ) {
        total +=
          timeseries[hour][0].data.next_1_hours.details.precipitation_amount;
      }
    }
  });

  return total.toFixed(1);
}

const isNegativeTemp = (temp: number) => {
  if (temp <= 0) {
    return true;
  }
  return false;
};
