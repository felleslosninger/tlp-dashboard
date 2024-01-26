"use client";
import React, { useEffect, useMemo, useState } from "react";

type DayProps = {
  daysAhead: number;
};
const ALL_DAYS = [
  "Sundag",
  "Mandag",
  "Tysdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Laurdag",
];

const Day = ({ daysAhead }: DayProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(new Date());
    };

    updateDate();
    const intervalId = setInterval(updateDate, 3 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const today = currentDate.getDay();

  const day = useMemo(() => {
    const daysAheadMod = daysAhead % 7;
    const daysAheadPositive = daysAheadMod < 0 ? daysAheadMod + 7 : daysAheadMod;
    const dayOfWeek = today + daysAheadPositive;

    return ALL_DAYS[dayOfWeek > 6 ? dayOfWeek - 7 : dayOfWeek];
  }, [daysAhead, today]);

  return <>{day}</>;
};

export default Day;
