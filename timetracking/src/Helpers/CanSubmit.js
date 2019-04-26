const canSubmit = props => {
  let selectedMonth = props.getMonth();
  let selectedYear = props.getFullYear();
  let activeDate = new Date(Date.now());
  let activeMonth = activeDate.getMonth();
  let activeYear = new Date().getFullYear();

  if (selectedMonth !== activeMonth || selectedYear !== activeYear) {
    return (props.isValidMonth = false);
  } else if (selectedMonth === activeMonth) {
    return (props.isValidMonth = true);
  }
};
export default canSubmit;
