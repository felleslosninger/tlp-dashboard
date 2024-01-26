import Image from "next/image";
import TeamCard from "@/components/team/team-card";
import NewsCard from "@/components/news/news-card";
import WeatherCard from "@/components/weather/weather-card";
import ServerCard from "@/components/server/server-card/server-card";
import WebsiteCard from "@/components/website/website-card";

import styles from "./page.module.css";

import tlpLogo from "../../public/tlp-logo.svg";

export const revalidate = 60;

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <Image
          src={tlpLogo}
          width={52}
          height={40}
          alt="Picture of the author"
        />
        <h1>Statustavle</h1>
      </header>
      <main className={styles.main}>
        <WebsiteCard />
        <WeatherCard />
        <div className={styles.statusAndTeamWrapper}>
          <ServerCard />
          <TeamCard />
        </div>
        <NewsCard />
      </main>
    </div>
  );
}
