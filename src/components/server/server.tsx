"use client";
import React from "react";
import styles from "./server.module.css";
import cn from "classnames";
import AnimatedNumber from "../utilities/animated-number";

type ServerProps = {
  serverName: string;
  url: string;
};

function getStatus(url: string): Promise<number> {
  return fetch("/api/server?url=" + url, {
    cache: "no-cache",
  }).then(async (res) => {
    const body = await new Response(res.body, {
      headers: { "Content-Type": "text/html" },
    }).text();
    return parseInt(body);
  });
}

const Server = ({ serverName, url }: ServerProps) => {
  const [diff, setDiff] = React.useState<number | undefined>(0);

  React.useEffect(() => {
    getStatus(url).then((status) => {
      setDiff(status);
    });

    const interval = setInterval(() => {
      getStatus(url).then((status) => {
        setDiff(status);
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [url]);

  return (
    <>
      <div
        className={cn(
          styles.serverWrapper,
          diff && diff !== 0 && diff > 50 ? styles.high : styles.low,
          diff === 0 && styles.noResponse,
          typeof diff !== 'number' && styles.high
        )}
      >
        <span className={styles.serverName}>{serverName}</span>
        {typeof diff === 'number' ? (
          <span className={styles.response}>
            <AnimatedNumber value={diff} /> req/sec
          </span>
        ) : (
          <span className={styles.response}>No response from server</span>
        )}
      </div>
    </>
  );
};

export default Server;
