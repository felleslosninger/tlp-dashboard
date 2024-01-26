import React from "react";
import Card from "@/components/card/Card";
import TeamMember from "@/components/team/member/member";

import styles from "./team-card.module.css";

import jensImg from "../../../public/jens.jpg";
import stureImg from "../../../public/sture.jpg";
import thuneImg from "../../../public/thune.png";
import tobiasImg from "../../../public/tobias.png";
import knutImg from "../../../public/knut.png";

const TEAMMEMBERS = [
  {
    fullName: "Sture Dingsøyr",
    role: "Teamleiar",
    imgData: stureImg,
    imgAlt: "Sture Dingsøyr",
    msId: "ef90ae43-468e-4d15-b81c-ad927a1db4e1",
  },
  {
    fullName: "Knut Moen",
    role: "Backend",
    imgData: knutImg,
    imgAlt: "Knut Moen",
    msId: "4471e6e8-cbea-42a3-986a-ff9cd2ea20d4",
  },
  {
    fullName: "Øyvind Thune",
    role: "Design / Frontend",
    imgData: thuneImg,
    imgAlt: "Øyvind Thune",
    msId: "e6a4123a-e64a-455c-a0f6-24f3ad0b1f24",
  },
  {
    fullName: "Jens Mo",
    role: "Frontend / Backend",
    imgData: jensImg,
    imgAlt: "Jens Mo",
    msId: "65ab5cbd-12da-4eb6-8982-28278078a1f4",
  },
  {
    fullName: "Tobias Barsnes",
    role: "Frontend",
    imgData: tobiasImg,
    imgAlt: "Tobias Barsnes",
    msId: "bf4f8d5e-8a8a-4ded-9407-00d2b4d094e9",
  },
];

const TeamCard = () => {
  return (
    <Card
      style={{
        height: "100%",
      }}
    >
      <h2>Teamet</h2>
      <div className={styles.wrapper}>
        {TEAMMEMBERS.map((member, index) => (
          <TeamMember
            key={index}
            fullName={member.fullName}
            role={member.role}
            imgData={member.imgData}
            imgAlt={member.imgAlt}
            msId={member.msId}
          />
        ))}
      </div>
    </Card>
  );
};

export default TeamCard;
