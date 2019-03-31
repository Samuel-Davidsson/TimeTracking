import axios from "axios";
import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import Api_Url from "../../Helpers/Api_Url";
import Error from "../../Helpers/Error";
import GenerateHeaderData from "../../Helpers/GenerateHeaderData";
import TotalHoursCount from "../../Helpers/TotalHoursCount";
import ChangeYearMonthForm from "./ChangeYearMonthForm";
import DeviationList from "./DeviationList";
import MainUserInfo from "./MainUserInfo";

class Timereport extends React.Component {
  state = {
    report: [],
    deviationItems: [],
    existingDevitations: [],
    month: new Date(),
    isValidMonth: true,
    sucess: "",
    error: ""
  };

  handleDayClick = this.handleDayClick.bind(this);

  componentDidMount = () => {
    const userId = localStorage.getItem("id");
    axios
      .get(`${Api_Url}/user/` + userId, { headers: GenerateHeaderData() })
      .then(res => {
        const deviationItems = res.data.deviationItems;
        const { id } = res.data;
        const existingDevitations = [];
        res.data.deviationItems.forEach(element => {
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
        localStorage.setItem("reportId", id);
        this.totalHours = res.data.hours;
        deviationItems.forEach(element => {
          element.absenceDate = new Date(element.absenceDate);
        });
        this.totalHours = TotalHoursCount(
          deviationItems.map(x => Number(x.hours))
        );

        this.setState({
          deviationItems: deviationItems,
          existingDevitations: existingDevitations,
          report: res.data,
          isLoading: false
        });
      });
  };

  handleDayClick(absenceDate, { selected, disabled }) {
    if (disabled) {
      return;
    }
    if (this.state.isValidMonth === false) {
      this.setState({
        error: "Tiden för att uppdatera har gått ut!"
      });
      return;
    }
    if (selected) {
      let filterDeviationItems = this.state.deviationItems;
      let filteredDeviationItems = filterDeviationItems.filter(
        x => x.absenceDate.getDate() !== absenceDate.getDate()
      );

      let totalHours = TotalHoursCount(
        filteredDeviationItems.map(x => Number(x.hours))
      );
      this.totalHours = totalHours;

      this.setState({
        deviationItems: filteredDeviationItems
      });
    } else {
      if (this.state.report.deviationItems === undefined) {
        this.state.deviationItems.push({
          absenceDate: absenceDate,
          hours: "",
          description: ""
        });
        let sortDeviationItems = this.state.deviationItems;

        let sortedDeviationItems = sortDeviationItems.sort(
          (a, b) => b.absenceDate.getDate() - a.absenceDate.getDate()
        );

        let totalHours = TotalHoursCount(
          sortedDeviationItems.map(x => Number(x.hours))
        );
        this.totalHours = totalHours;

        this.setState({
          deviationItems: sortedDeviationItems
        });
      } else {
        const deviationsExist = this.state.existingDevitations
          .map(x => x.absenceDate.toDateString())
          .includes(absenceDate.toDateString());
        if (deviationsExist === false) {
          this.state.deviationItems.push({
            absenceDate: absenceDate,
            hours: "",
            description: ""
          });
        }
        this.state.existingDevitations.forEach(element => {
          if (
            element.absenceDate.toDateString() === absenceDate.toDateString() &&
            deviationsExist === true
          ) {
            this.state.deviationItems.push({
              hours: element.hours,
              absenceDate: absenceDate,
              description: element.description
            });
          }
        });
        let sortDeviationItems = this.state.deviationItems;
        let sortedDeviationItems = sortDeviationItems.sort(
          (a, b) => b.absenceDate.getDate() - a.absenceDate.getDate()
        );
        let totalHours = TotalHoursCount(
          sortedDeviationItems.map(x => Number(x.hours))
        );
        this.totalHours = totalHours;

        this.setState({
          deviationItems: sortedDeviationItems
        });
      }
    }
  }

  handleDescriptionChange = (event, deviationItem) => {
    this.setState([(deviationItem.description = event.target.value)]);
  };

  handleHoursChange = (event, deviationItem) => {
    this.setState([(deviationItem.hours = event.target.value)]);
    this.totalHours = TotalHoursCount(
      this.state.deviationItems.map(x => Number(x.hours))
    );
  };

  canSubmit() {
    let selectedMonth = this.state.month.getMonth();
    let selectedYear = this.state.month.getFullYear();
    let activeDate = new Date(Date.now());
    let activeMonth = activeDate.getMonth();
    let activeYear = new Date().getFullYear();
    if (selectedMonth !== activeMonth || selectedYear !== activeYear) {
      this.setState({
        isValidMonth: false,
        error: "Tiden för att uppdatera har gått ut"
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post(
        `${Api_Url}/report/addreport`,
        {
          id: this.state.report.id,
          deviationItems: this.state.deviationItems,
          userId: localStorage.getItem("id"),
          currentMonth: this.state.month
        },
        { headers: GenerateHeaderData() }
      )
      .then(res => {
        const data = res.data;
        const deviationItems = data.deviationItems;
        const existingDevitations = [];
        if (res.status === 200)
          deviationItems.forEach(element => {
            element.absenceDate = new Date(element.absenceDate);
          });
        data.deviationItems.forEach(element => {
          existingDevitations.push({
            reportId: element.reportId,
            id: element.id,
            hours: element.hours,
            absenceDate: element.absenceDate,
            description: element.description
          });
        });
        this.setState({
          success: "Uppgifterna har sparats/updaterats.",
          deviationItems: deviationItems,
          report: data,
          existingDevitations: existingDevitations
        });
      });
  };

  handleYearMonthChange = month => {
    this.setState({ month });
    axios
      .post(
        `${Api_Url}/report/getuserreport`,
        { currentMonth: month, userId: localStorage.getItem("id") },
        { headers: GenerateHeaderData() }
      )
      .then(res => {
        if (res.data === "Nothing")
          this.setState({
            isLoading: false
          });

        const data = res.data;
        this.totalHours = data.hours;
        const deviationItems = data.deviationItems;
        const existingDevitations = [];

        this.canSubmit();
        if (deviationItems === undefined)
          this.setState({
            deviationItems: [],
            existingDevitations: []
          });

        if (deviationItems === undefined) return false;

        deviationItems.forEach(element => {
          element.absenceDate = new Date(element.absenceDate);
        });
        data.deviationItems.forEach(element => {
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
        this.totalHours = TotalHoursCount(
          deviationItems.map(x => Number(x.hours))
        );
        this.setState({
          report: data,
          deviationItems: deviationItems,
          existingDevitations: existingDevitations,
          isValidMonth: true,
          error: ""
        });
        this.canSubmit();
      });
  };
  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  render() {
    return (
      <div>
        <MainUserInfo
          totalHours={this.totalHours}
          attest={this.state.report.attest}
          firstName={this.firstName}
          lastName={this.lastName}
        />
        <div className="YearNavigation">
          <DayPicker
            selectedDays={this.state.deviationItems.map(x => x.absenceDate)}
            onDayClick={this.handleDayClick}
            month={new Date(this.state.month)}
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
        <Error errormsg={this.state.error} />
        <div className="deviationList">
          <DeviationList
            deviationItems={this.state.deviationItems}
            handleDescriptionChange={this.handleDescriptionChange}
            handleHoursChange={this.handleHoursChange}
            handleSubmit={this.handleSubmit}
            isValidMonth={this.state.isValidMonth}
          />
        </div>
      </div>
    );
  }
}
export default Timereport;
