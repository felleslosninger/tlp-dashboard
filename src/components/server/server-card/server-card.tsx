import React, { Suspense } from "react";
import Card from "@/components/card/Card";
import Server from "../server";

import styles from "./server-card.module.css";

const ServerStatusCard = () => {
  return (
    <Card>
      <h2>Status serverar</h2>
      <div className={styles.wrapper}>
        <Suspense fallback="Loading...">
          <Server
            serverName="LB1"
            url="http://lb1.difi.no/nginx-status"
          />
          <Server
            serverName="LB2"
            url="http://lb2.difi.no/nginx-status"
          />
          <Server
            serverName="LB3"
            url="http://lb3.difi.no/nginx-status"
          />
          <Server
            serverName="Drupal APP01"
            url="http://drupal-app01.dmz.local/nginx-status"
          />
        </Suspense>
      </div>
    </Card>
  );
};

export default ServerStatusCard;
