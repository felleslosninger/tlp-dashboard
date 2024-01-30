"use client";
import React from "react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import cn from "classnames";

import styles from "./member.module.css";

type TeamMemberProps = {
  fullName: string;
  role: string;
  imgData: StaticImageData;
  imgAlt: string;
  msId: string;
};

const getUserStatus = async (msId: string) => {
  const response = await fetch("/api/ms", {
    method: "GET",
  });

  const data = await response.text();
  const users = JSON.parse(data);

  const member = users.filter((user: any) => user.id === msId);

  return member;
};

const TeamMember = ({
  fullName,
  role,
  imgData,
  imgAlt,
  msId,
}: TeamMemberProps) => {
  const [member, setMember] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      getUserStatus(msId).then((members) => {
        setMember(members);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [msId]);

  let userStatus = member[0]?.availability;
  let userActivity = member[0]?.activity;

  const getStatusIcon = () => {
    switch (userActivity) {
      case "Available":
        return "Available";
      case "Busy":
        return "Busy";
      case "InACall":
        return "Busy";
      case "InAMeeting":
        return "Busy";
      case "DoNotDisturb":
        return "DoNotDisturb";
      case "Presenting":
        return "DoNotDisturb";
      case "Away":
        return "Away";
      case "Inactive":
        return "Away";
      case "OutOfOffice":
        return "OutOfOffice";
      case "Offline":
        return "Offline";
      default:
        return "Offline";
    }
  };

  return (
    <div className={styles.teamCard}>
      <Image
        alt={imgAlt}
        src={imgData}
        className={cn(
          styles.memberImg,
          userStatus === "Available" && styles.available,
          userStatus === "Busy" && styles.busy,
          userStatus === "BusyIdle" && styles.busy,
          userStatus === "DoNotDisturb" && styles.busy,
          userStatus === "Away" && styles.away,
          userStatus === "AvailableIdle" && styles.away,
          userStatus === "Offline" && styles.offline,
          userActivity === "OutOfOffice" && styles.outOfOffice,
          !userStatus && styles.offline
        )}
      />
      <Image
        className={styles.statusIcon}
        src={"/teams_icons/" + getStatusIcon() + ".svg"}
        alt="status icon"
        width={35}
        height={35}
      />
      <span className={styles.fullName}>{fullName}</span>
      <span className={styles.role}>{role}</span>
    </div>
  );
};

export default TeamMember;
