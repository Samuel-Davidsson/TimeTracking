import axios from "axios";
import "moment/locale/sv";
import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils from "react-day-picker/moment";
import { toast, ToastContainer } from "react-toastify";
import Api_Url from "../../Helpers/Api_Url";
import GenerateHeaderData from "../../Helpers/GenerateHeaderData";
import ChangeYearMonthForm from "./ChangeYearMonthForm";
import DeviationList from "./Devations/DeviationList";
import MainUserInfo from "./MainUserInfo";
import "./UserRoute.css";

const report = props => {
  const handleDayClick = (absenceDate, { selected, disabled }) => {
    if (disabled) {
      return;
    }
    if (props.isValidMonth === false) {
      return;
    }
    if (selected) {
      let filterDeviationItems = props.deviationItems;
      let filteredDeviationItems = filterDeviationItems.filter(
        x => x.absenceDate.getDate() !== absenceDate.getDate()
      );
      props.handleDeviationClicked(filteredDeviationItems);
    } else {
      if (props.report.deviationItems === undefined) {
        props.deviationItems.push({
          absenceDate: absenceDate,
          hours: "",
          description: ""
        });
        let sortDeviationItems = props.deviationItems;

        let sortedDeviationItems = sortDeviationItems.sort(
          (a, b) => b.absenceDate.getDate() - a.absenceDate.getDate()
        );

        props.handleDeviationClicked(sortedDeviationItems);
      } else {
        const deviationsExist = props.existingDevitations
          .map(x => x.absenceDate.toDateString())
          .includes(absenceDate.toDateString());
        if (deviationsExist === false) {
          props.deviationItems.push({
            absenceDate: absenceDate,
            hours: "",
            description: ""
          });
        }
        props.existingDevitations.forEach(element => {
          if (
            element.absenceDate.toDateString() === absenceDate.toDateString() &&
            deviationsExist === true
          ) {
            props.deviationItems.push({
              hours: element.hours,
              absenceDate: absenceDate,
              description: element.description
            });
          }
        });
        let sortDeviationItems = props.deviationItems;
        let sortedDeviationItems = sortDeviationItems.sort(
          (a, b) => b.absenceDate.getDate() - a.absenceDate.getDate()
        );
        props.handleDeviationClicked(sortedDeviationItems);
      }
    }
  };

  const handleYearMonthChange = month => {
    props.handleMonthOrYearClicked(month);
    axios
      .post(
        `${Api_Url}/report/getuserreport`,
        { currentMonth: month, userId: localStorage.getItem("id") },
        { headers: GenerateHeaderData() }
      )
      .then(res => {
        if (res.data.deviationItems === null)
          props.getReportForYearAndMonth(res.data.deviationItems);
        if (res.data.deviationItems === null) return false;
        res.data.deviationItems.forEach(element => {
          element.absenceDate = new Date(element.absenceDate);
        });
        props.getReportForYearAndMonth(res.data);
      })
      .catch(error => {
        toast.error(error.response.data);
      });
  };

  const firstName = localStorage.getItem("firstname");
  const lastName = localStorage.getItem("lastname");

  return (
    <div>
      <div className="YearNavigation">
        <p className="YearNavigation-header">
          Klicka på ett datum för att fylla i datum.
        </p>
        <ToastContainer />
        <DayPicker
          selectedDays={props.deviationItems.map(x => x.absenceDate)}
          onDayClick={handleDayClick}
          month={props.month}
          localeUtils={MomentLocaleUtils}
          locale={props.locale}
          keepFocus={true}
          canChangeMonth={false}
          disabledDays={{ daysOfWeek: [0, 6] }}
          captionElement={({ date, localeUtils }) => (
            <ChangeYearMonthForm
              date={date}
              localeUtils={localeUtils}
              onChange={handleYearMonthChange}
            />
          )}
        />
      </div>
      <div className="timereport-main-div">
        <p className="user-comment">
          Fyll i din frånvaro här senast den sista dagen varje månad!
        </p>
        <MainUserInfo
          firstName={firstName}
          lastName={lastName}
          totalHours={props.totalHours}
          attest={props.report.attest}
          handleCheckBoxClicked={props.handleCheckBoxClicked}
        />
        <DeviationList
          deviationItems={props.deviationItems}
          handleDescriptionChange={props.handleDescriptionChange}
          handleHoursChange={props.handleHoursChange}
          handleSubmit={props.handleSubmit}
          isValidMonth={props.isValidMonth}
        />
      </div>
    </div>
  );
};
export default React.memo(report);
