import "react-date-range/dist/styles.css";
import type { Dispatch, FC, SetStateAction } from "react";
import "react-date-range/dist/theme/default.css";
import "./DoubleCalendar.css";
import {
  DateRangePicker,
  createStaticRanges,
  defaultInputRanges,
  type RangeKeyDict,
} from "react-date-range";
import srLatn from "date-fns/locale/sr-Latn";
import enGB from "date-fns/locale/en-GB";
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
import { useTranslation } from "react-i18next";

type DoubleCalendarArguments = {
  dateRange: RangeType[];
  setDateRange: Dispatch<SetStateAction<RangeType[]>>;
};

const DoubleCalendar: FC<DoubleCalendarArguments> = ({
  dateRange,
  setDateRange,
}) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const locale = i18n.language === "sr" ? srLatn : enGB;

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
    // this is checkpoint
  };

  const customRanges = createStaticRanges([
    {
      label: t("dcalendar.yesterday"),
      range: () => ({
        startDate: subDays(new Date(), 1),
        endDate: subDays(new Date(), 1),
      }),
    },
    {
      label: t("dcalendar.today"),
      range: () => ({
        startDate: startOfDay(new Date()),
        endDate: endOfDay(new Date()),
      }),
    },
    {
      label: t("dcalendar.tomorrow"),
      range: () => ({
        startDate: addDays(new Date(), 1),
        endDate: addDays(new Date(), 1),
      }),
    },
    {
      label: t("dcalendar.lastweek"),
      range: () => ({
        startDate: startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
        endDate: endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
      }),
    },
    {
      label: t("dcalendar.thisweek"),
      range: () => ({
        startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
        endDate: endOfWeek(new Date(), { weekStartsOn: 1 }),
      }),
    },
    {
      label: t("dcalendar.nextweek"),
      range: () => ({
        startDate: startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }),
        endDate: endOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }),
      }),
    },
    {
      label: t("dcalendar.lastmonth"),
      range: () => ({
        startDate: startOfMonth(subMonths(new Date(), 1)),
        endDate: endOfMonth(subMonths(new Date(), 1)),
      }),
    },
    {
      label: t("dcalendar.thismonth"),
      range: () => ({
        startDate: startOfMonth(new Date()),
        endDate: endOfMonth(new Date()),
      }),
    },
    {
      label: t("dcalendar.nextmonth"),
      range: () => ({
        startDate: startOfMonth(addMonths(new Date(), 1)),
        endDate: endOfMonth(addMonths(new Date(), 1)),
      }),
    },
  ]);

  const customInputRanges = defaultInputRanges.map((range) => ({
    ...range,
    label:
      range.label === "days up to today"
        ? t("dcalendar.dutt")
        : range.label === "days starting today"
          ? t("dcalendar.dst")
          : range.label,
  }));

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
          inputRanges={customInputRanges}
          locale={locale}
        />
      </div>
    </div>
  );
};

export default DoubleCalendar;
