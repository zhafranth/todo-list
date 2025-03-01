import React from "react";
import { Badge } from "./ui/badge";

const FilterDate = () => {
  const dateOptions = [
    {
      label: "Today",
      value: "today",
    },
    {
      label: "This Week",
      value: "this_week",
    },
    {
      label: "This month",
      value: "this_month",
    },
  ];
  return (
    <div className="flex gap-x-4 items-center mt-5">
      {dateOptions.map((item, index) => (
        <Badge
          key={index}
          className="cursor-pointer bg-blue-200 dark:bg-blue-950 text-blue-600 dark:text-blue-100"
          variant="secondary"
        >
          {item.label}
        </Badge>
      ))}
    </div>
  );
};

export default FilterDate;
