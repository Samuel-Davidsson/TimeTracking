import axios from "axios";
import "moment/locale/sv";
import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils from "react-day-picker/moment";
import Api_Url from "../../Helpers/Api_Url";
import GenerateHeaderData from "../../Helpers/GenerateHeaderData";
import ChangeYearMonthForm from "./ChangeYearMonthForm";
import "./UserRoute.css";

class Report extends React.Component {
  handleDayClick = this.handleDayClick.bind(this);

  handleDayClick(absenceDate, { selected, disabled }) {
    if (disabled) {
      return;
    }
    if (this.props.isValidMonth === false) {
      return;
    }
    if (selected) {
      let filterDeviationItems = this.props.deviationItems;
      let filteredDeviationItems = filterDeviationItems.filter(
        x => x.absenceDate.getDate() !== absenceDate.getDate()
      );
      this.props.handleDeviationClicked(filteredDeviationItems);
    } else {
      if (this.props.report.deviationItems === undefined) {
        this.props.deviationItems.push({
          absenceDate: absenceDate,
          hours: "",
          description: ""
        });
        let sortDeviationItems = this.props.deviationItems;

        let sortedDeviationItems = sortDeviationItems.sort(
          (a, b) => b.absenceDate.getDate() - a.absenceDate.getDate()
        );

        this.props.handleDeviationClicked(sortedDeviationItems);
      } else {
        const deviationsExist = this.props.existingDevitations
          .map(x => x.absenceDate.toDateString())
          .includes(absenceDate.toDateString());
        if (deviationsExist === false) {
          this.props.deviationItems.push({
            absenceDate: absenceDate,
            hours: "",
            description: ""
          });
        }
        this.props.existingDevitations.forEach(element => {
          if (
            element.absenceDate.toDateString() === absenceDate.toDateString() &&
            deviationsExist === true
          ) {
            this.props.deviationItems.push({
              hours: element.hours,
              absenceDate: absenceDate,
              description: element.description
            });
          }
        });
        let sortDeviationItems = this.props.deviationItems;
        let sortedDeviationItems = sortDeviationItems.sort(
          (a, b) => b.absenceDate.getDate() - a.absenceDate.getDate()
        );
        this.props.handleDeviationClicked(sortedDeviationItems);
      }
    }
  }
  handleYearMonthChange = month => {
    this.props.handleMonthOrYearClicked(month);
    axios
      .post(
        `${Api_Url}/report/getuserreport`,
        { currentMonth: month, userId: localStorage.getItem("id") },
        { headers: GenerateHeaderData() }
      )
      .then(res => {
        if (res.data.deviationItems === null)
          this.props.getReportForYearAndMonth(res.data.deviationItems);
        if (res.data.deviationItems === null) return false;
        res.data.deviationItems.forEach(element => {
          element.absenceDate = new Date(element.absenceDate);
        });
        this.props.getReportForYearAndMonth(res.data);
      });
  };
  render() {
    return (
      <div>
        <div className="YearNavigation">
          <p className="YearNavigation-header">
            Klicka på ett datum för att fylla i datum.
          </p>
          <DayPicker
            selectedDays={this.props.deviationItems.map(x => x.absenceDate)}
            onDayClick={this.handleDayClick}
            month={this.props.month}
            localeUtils={MomentLocaleUtils}
            locale={this.props.locale}
            keepFocus={true}
            canChangeMonth={false}
            disabledDays={{ daysOfWeek: [0, 6] }}
            captionElement={({ date, localeUtils }) => (
              <ChangeYearMonthForm
                date={date}
                localeUtils={localeUtils}
                onChange={this.handleYearMonthChange}
              />
            )}
          />
        </div>
      </div>
    );
  }
}
export default Report;
