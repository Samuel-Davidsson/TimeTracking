const canSubmit = (parsedValidMonth, accepted) => {
  let selectedMonth = parsedValidMonth.getMonth();
  let selectedYear = parsedValidMonth.getFullYear();
  let activeDate = new Date(Date.now());
  let activeMonth = activeDate.getMonth();
  let activeYear = new Date().getFullYear();
  if (selectedMonth === activeMonth || accepted === true) {
    return (parsedValidMonth.isValidMonth = true);
  } else if (selectedMonth !== activeMonth || selectedYear !== activeYear) {
    return (parsedValidMonth.isValidMonth = false);
  }
};
export default canSubmit;
