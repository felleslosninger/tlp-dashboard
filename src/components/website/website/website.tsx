"use client";
import React from "react";
import cn from "classnames";
import { Website } from "../website-card";

import classes from "./website.module.css";

export default function Website({ id, name, uptime, status }: Website) {
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div
          className={cn(
            classes.avatar,
            status && status.includes("down") && classes.down
          )}
        >
          {name[0]}
          {name[1]}
        </div>
        <div className={classes.name}>{name}</div>
      </div>
      <div
        className={cn(
          classes.uptime,
          status ? classes[status] : classes.noStatus,
          status && status.includes("down") && classes.down
        )}
      >
        {uptime
          ? status && status.includes("down")
            ? "Nede"
            : `${uptime.toFixed(2)}%`
          : "N/A"}
      </div>
    </div>
  );
}
