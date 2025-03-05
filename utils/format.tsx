import dayjs from "dayjs";
import "dayjs/locale/id"; // Import locale bahasa Indonesia
import weekday from "dayjs/plugin/weekday";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(weekday);
dayjs.extend(localizedFormat);
dayjs.locale("id");

export const formatDate = (date: Date) =>
  dayjs(date).format("dddd, DD MMMM YYYY");
