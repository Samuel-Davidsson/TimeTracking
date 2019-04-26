import React from "react";
import Capitalize from "../../Helpers/Capitalize";

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, -1, 1);
const toMonth = new Date(currentYear + 0, 0);
const locale = "sv-se";
const localeEnglish = "en-us";

const changeYearMonthForm = ({ date, localeUtils, onChange }) => {
  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }
  const selectedYear = date.getFullYear();
  const fromYear = fromMonth.getFullYear();
  const toYear = toMonth.getFullYear();
  let currentMonth = new Date().getMonth();
  let currentMonthDate = new Date();

  const activeMonth = new Date(currentYear, currentMonth),
    currentMonthName = activeMonth.toLocaleString(locale, { month: "long" });
  const currentMonthNameCapitalize = Capitalize(currentMonthName);

  var months = [];

  if (selectedYear === fromYear) {
    months = localeUtils.getMonths();
  }

  if (selectedYear === toYear && currentMonth !== 0) {
    const monthsToCheck = localeUtils.getMonths();
    const month = currentMonthDate.toLocaleString(localeEnglish, {
      month: "long"
    });
    const monthName = Capitalize(month);

    for (let i = 0; i < monthsToCheck.length; i++) {
      months.push(monthsToCheck[i]);
      if (monthsToCheck[i] === monthName) {
        break;
      }
    }
  }

  if (selectedYear === toYear && currentMonth === 0) {
    months.push(currentMonthNameCapitalize);
  }

  const handleChange = e => {
    const { year, month } = e.target.form;
    var selectedYear = parseInt(year.value);
    var selectedMonth = parseInt(month.value);
    if (currentMonth < selectedMonth && currentYear === selectedYear) {
      month.value = currentMonth;
    }
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select
        className="month-dropdown"
        name="month"
        onChange={handleChange}
        value={date.getMonth()}
      >
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select
        className="year-dropdown"
        name="year"
        onChange={handleChange}
        value={date.getFullYear()}
      >
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
};
export default changeYearMonthForm;
