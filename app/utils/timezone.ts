import * as dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const useTimeZone = (date: any, time: any) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return dayjs.tz(`${date} ${time}`, dayjs.tz.guess()).toISOString();
};
