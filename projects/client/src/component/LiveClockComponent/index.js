import dayjs from "dayjs";
import { useState } from "react";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(calendar);

const LiveClockComponent = () => {
  const time = dayjs().calendar(null, { sameDay: "[Today at] h:mm A" });
  const [clock, setClock] = useState(time);

  return <div>{clock}</div>;
};

export default LiveClockComponent;
