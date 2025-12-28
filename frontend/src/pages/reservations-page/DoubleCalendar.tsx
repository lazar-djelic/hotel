import "react-date-range/dist/styles.css";
import type { Dispatch, FC, SetStateAction } from "react";
import "react-date-range/dist/theme/default.css";
import "./DoubleCalendar.css";
import {
  DateRangePicker,
  createStaticRanges,
  type RangeKeyDict,
} from "react-date-range";
import srLatn from "date-fns/locale/sr-Latn";
import {
  addMonths,
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
  subDays,
  startOfWeek,
  endOfWeek,
  subWeeks,
  addDays,
  addWeeks,
  subMonths,
} from "date-fns";
import type { RangeType } from "../interfaces/RangeType";

type DoubleCalendarArguments = {
  dateRange: RangeType[];
  setDateRange: Dispatch<SetStateAction<RangeType[]>>;
};

const DoubleCalendar: FC<DoubleCalendarArguments> = ({
  dateRange,
  setDateRange,
}) => {
  const handleChange = async (range: RangeKeyDict) => {
    const mappedRange: RangeType[] = [
      {
        startDate: range.selection.startDate || new Date(),
        endDate: range.selection.endDate || new Date(),
        key: "selection",
      },
    ];

    setDateRange(mappedRange);

    // console.log(range);
    // const msInADay = 1000 * 60 * 60 * 24;
    // const razlika =
    //   range.selection.endDate && range.selection.startDate
    //     ? (range.selection.endDate.getTime() -
    //         range.selection.startDate.getTime()) /
    //       msInADay
    //     : 0;
    // console.log("Broj dana izmedju dva datuma je: ", razlika);
  };

  const customRanges = createStaticRanges([
    {
      label: "Yesterday",
      range: () => ({
        startDate: subDays(new Date(), 1),
        endDate: subDays(new Date(), 1),
      }),
    },
    {
      label: "Today",
      range: () => ({
        startDate: startOfDay(new Date()),
        endDate: endOfDay(new Date()),
      }),
    },
    {
      label: "Tomorrow",
      range: () => ({
        startDate: addDays(new Date(), 1),
        endDate: addDays(new Date(), 1),
      }),
    },
    {
      label: "Last Week",
      range: () => ({
        startDate: startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
        endDate: endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
      }),
    },
    {
      label: "This Week",
      range: () => ({
        startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
        endDate: endOfWeek(new Date(), { weekStartsOn: 1 }),
      }),
    },
    {
      label: "Next Week",
      range: () => ({
        startDate: startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }),
        endDate: endOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }),
      }),
    },
    {
      label: "Last Month",
      range: () => ({
        startDate: startOfMonth(subMonths(new Date(), 1)),
        endDate: endOfMonth(subMonths(new Date(), 1)),
      }),
    },
    {
      label: "This Month",
      range: () => ({
        startDate: startOfMonth(new Date()),
        endDate: endOfMonth(new Date()),
      }),
    },
    {
      label: "Next Month",
      range: () => ({
        startDate: startOfMonth(addMonths(new Date(), 1)),
        endDate: endOfMonth(addMonths(new Date(), 1)),
      }),
    },
  ]);

  const allStaticRanges = [...customRanges];

  return (
    <div className="inline-block rounded-x2 border-2 border-slate p-2">
      <div className="custom-date-range">
        <DateRangePicker
          ranges={dateRange}
          onChange={handleChange}
          weekStartsOn={1}
          months={2}
          staticRanges={allStaticRanges}
          locale={srLatn}
        />
      </div>
    </div>
  );
};

export default DoubleCalendar;
