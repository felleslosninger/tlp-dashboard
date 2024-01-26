"use client";
import React from "react";
import Card from "@/components/card/Card";
import Website from "./website/website";
import { AnimatePresence, motion } from "framer-motion";

import { useWebsitesData } from "./useWebsitesData";

import classes from "./website-card.module.css";

const PAGE_LIMIT = 6;

const WebsiteCard = () => {
  const websites = useWebsitesData(ALL_SITES);

  return <Websites websites={websites} />;
};

export default WebsiteCard;

const Websites = ({ websites }: { websites: Website[] }) => {
  const [page, setPage] = React.useState(1);

  const pinned = websites.filter((website) => website.pinned);

  const websitesChild = React.useMemo(() => {
    const rest = websites.filter((website) => !website.pinned);
    const limit = PAGE_LIMIT - pinned.length;

    const start = (page - 1) * limit;
    const end = start + limit;

    return rest.slice(start, end);
  }, [page, pinned.length, websites]);

  const maxPage = React.useMemo(() => {
    const limit = PAGE_LIMIT - pinned.length;
    const sites = websites.filter((website) => !website.pinned);
    return Math.ceil(sites.length / limit);
  }, [pinned.length, websites]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPage((page) => (page >= maxPage ? 1 : page + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [maxPage, page]);

  return (
    <Card
      style={{
        overflow: "hidden",
        gap: "0",
      }}
    >
      <h2 className={classes.header}>
        <span>
          Nettsider Status <span>(siste 30 dagar)</span>
        </span>
        <span className={classes.pagination}>
          {page} / {maxPage}
        </span>
      </h2>
      <div>
        {pinned.map((website) => (
          <div key={website.id} className={classes.websiteWrapper}>
            <Website {...website} />
          </div>
        ))}
        <AnimatePresence mode='wait'>
          <motion.div
            key={page}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {websitesChild.map((website) => (
              <div key={website.id} className={classes.websiteWrapper}>
                <Website {...website} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
};

export type Website = {
  id: number;
  name: string;
  pinned: boolean;
  uptime?: number;
  status?: "up" | "down" | "unknown" | "unconfirmed";
};

const ALL_SITES: Website[] = [
  {
    name: "Digdir",
    id: 5687834,
    pinned: false,
  },
  {
    name: "Hjelpesider for fellesløsninger",
    id: 3353500,
    pinned: false,
  },
  {
    name: "Norge.no",
    id: 2348098,
    pinned: false,
  },
  {
    name: "Tilsynet",
    id: 3353446,
    pinned: false,
  },
  {
    name: "Tilsynet - admin API",
    id: 12835165,
    pinned: false,
  },
  {
    name: "Tilsynet - UUstatus",
    id: 12835166,
    pinned: false,
  },
  {
    name: "Norsk lysingsblad",
    id: 2348106,
    pinned: false,
  },
  {
    name: "Samarbeidsportalen",
    id: 2964883,
    pinned: false,
  },
  {
    name: "Samarbeidsportalen - minside",
    id: 12835155,
    pinned: false,
  },
  {
    name: "Prosjektveiviseren",
    id: 12835159,
    pinned: false,
  },
  {
    name: "Profilveileder",
    id: 12835158,
    pinned: false,
  },
  {
    name: "Organisasjonslogo",
    id: 3353662,
    pinned: false,
  },
  {
    name: "Datahotellet",
    id: 3353608,
    pinned: false,
  },
  {
    name: "Datahotellet - API",
    id: 4350078,
    pinned: false,
  },
  {
    name: "Felles datakatalog - API",
    id: 12835154,
    pinned: false,
  },
  {
    name: "Felles brukarhandtering",
    id: 12835147,
    pinned: false,
  },
  {
    name: "Felles brukarhandtering - Autoriseringsportal",
    id: 12835152,
    pinned: false,
  },
  /*{
    name: "test",
    id: 12846127,
    pinned: true,
  },*/
];
