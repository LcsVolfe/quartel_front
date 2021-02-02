import moment from "moment";

export const FormatDate = (value) => value ? moment(value).format('DD/MM/YYYY'):null;
export const FirstDayMonth = moment().clone().startOf('month').format('DD/MM/YYYY');
export const LastDayMonth = moment().clone().endOf('month').format('DD/MM/YYYY');
export const FirstDayMonthDatePicker = moment().clone().startOf('month');
export const LastDayMonthDatePicker = moment().clone().endOf('month');
// export const LastDayMonth = moment().clone().endOf('month').format('DD/MM/YYYY');


// export const FormatDate = (value) => value ? moment(new Date(value)).format('DD/MM/YYYY'):null;
