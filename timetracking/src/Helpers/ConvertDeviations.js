const convertDeviations = props => {
  const existingDevitations = [];
  if (props === null) return;
  props.forEach(element => {
    existingDevitations.push({
      reportId: element.reportId,
      id: element.id,
      hours: element.hours,
      absenceDate: element.absenceDate,
      description: element.description
    });
  });
  existingDevitations.forEach(element => {
    element.absenceDate = new Date(element.absenceDate);
  });
  return existingDevitations;
};
export default convertDeviations;
