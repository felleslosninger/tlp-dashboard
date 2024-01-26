import React, { cache } from "react";
import { Website } from "./website-card";

export const useWebsitesData = (websites: Website[]) => {
  const [localWebsites, setLocalWebsites] = React.useState(websites);

  // get uptime for each website
  React.useEffect(() => {
    // check if we have fetched uptime in the last 12 hours
    const getStatusAndUptime = async () => {
      // check if we have fetched data in the last 5 minutes
      const now = new Date();
      // loop through websites and fetch status, and uptime if needed
      const promises = websites.map(async (website) => {
        const response = await asyncGetStatus(website.id);
        const data = await response.json();
        const status = JSON.parse(data).results[0].status;

        const response2 = await asyncGetUptime(website.id);
        const data2 = await response2.json();
        const uptime = JSON.parse(data2).summary;

        return {
          ...website,
          status,
          pinned: website.pinned
            ? website.pinned
            : status.includes("down")
            ? true
            : false,
          uptime:
            (uptime.status.totalup /
              (uptime.status.totalup +
                uptime.status.totaldown +
                uptime.status.totalunknown)) *
            100,
        };
      });

      // wait for all promises to resolve
      const results = await Promise.all(promises);

      // update data
      setLocalWebsites(results);
    };

    getStatusAndUptime();

    const interval = setInterval(() => {
      getStatusAndUptime();
    }, 120000);

    return () => clearInterval(interval);
  }, [websites]);

  return localWebsites;
};

const asyncGetUptimeFunc = cache((id: number) => {
  return fetch(`/api/website/uptime?id=${id}`, {
    cache: "default",
    next: { revalidate: 36000 },
  });
});

function asyncGetUptime(id: number) {
  return asyncGetUptimeFunc(id);
}

function asyncGetStatus(id: number) {
  return fetch(`/api/website/status?id=${id}`, {
    next: {
      revalidate: 0,
    },
  });
}
