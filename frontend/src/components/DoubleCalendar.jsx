import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker, createStaticRanges } from 'react-date-range';
import { srLatn } from 'date-fns/locale/sr-Latn';
import { addMonths, endOfDay, endOfMonth, startOfDay, startOfMonth, subDays, startOfWeek, endOfWeek, subWeeks, addDays, addWeeks, subMonths } from "date-fns";

const DoubleCalendar = ({ dateRange, setDateRange }) => {
    const handleChange = async (range) => {
        setDateRange([range.selection]);

        const msInADay = 1000 * 60 * 60 * 24;
        const razlika = (range.selection.endDate - range.selection.startDate) / msInADay;
        console.log("Broj dana izmedju dva datuma je: ", (razlika));
    };

    const customRanges = createStaticRanges([
        {
            label: 'Yesterday',
            range: () => ({
                startDate: subDays(new Date(), 1, { weekStartsOn: 1 }),
                endDate: subDays(new Date(), 1, { weekStartsOn: 1 }),
            }),
        },
        {
            label: 'Today',
            range: () => ({
                startDate: startOfDay(new Date(), { weekStartsOn: 1 }),
                endDate: endOfDay(new Date(), { weekStartsOn: 1 }),
            }),
        },
        {
            label: 'Tomorrow',
            range: () => ({
                startDate: addDays(new Date(), 1, { weekStartsOn: 1 }),
                endDate: addDays(new Date(), 1, { weekStartsOn: 1 }),
            }),
        },
        {
            label: 'Last Week',
            range: () => ({
                startDate: startOfWeek(subWeeks(new Date(), 1, { weekStartsOn: 1 }), { weekStartsOn: 1 }),
                endDate: endOfWeek(subWeeks(new Date(), 1, { weekStartsOn: 1 }), { weekStartsOn: 1 }),
            }),
        },
        {
            label: 'This Week',
            range: () => ({
                startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
                endDate: endOfWeek(new Date(), { weekStartsOn: 1 }),
            }),
        },
        {
            label: 'Next Week',
            range: () => ({
                startDate: startOfWeek(addWeeks(new Date(), 1, { weekStartsOn: 1 }), { weekStartsOn: 1 }),
                endDate: endOfWeek(addWeeks(new Date(), 1, { weekStartsOn: 1 }), { weekStartsOn: 1 }),
            }),
        },
        {
            label: 'Last Month',
            range: () => ({
                startDate: startOfMonth(subMonths(new Date(), 1, { weekStartsOn: 1 }), { weekStartsOn: 1 }),
                endDate: endOfMonth(subMonths(new Date(), 1, { weekStartsOn: 1 }), { weekStartsOn: 1 }),
            }),
        },
        {
            label: 'This Month',
            range: () => ({
                startDate: startOfMonth(new Date(), { weekStartsOn: 1 }),
                endDate: endOfMonth(new Date(), { weekStartsOn: 1 }),
            }),
        },
        {
            label: 'Next Month',
            range: () => ({
                startDate: startOfMonth(addMonths(new Date(), 1, { weekStartsOn: 1 }), { weekStartsOn: 1 }),
                endDate: endOfMonth(addMonths(new Date(), 1, { weekStartsOn: 1 }), { weekStartsOn: 1 }),
            }),
        },
    ]);

    const allStaticRanges = [
        ...customRanges,
    ];

    const allInputRanges = [
    ];

    return (<DateRangePicker
        ranges={dateRange}
        onChange={handleChange}
        weekStartsOn={1}
        months={2}
        staticRanges={allStaticRanges}
        inputRanges={allInputRanges}
        locale={srLatn}
    />);
};

export default DoubleCalendar;