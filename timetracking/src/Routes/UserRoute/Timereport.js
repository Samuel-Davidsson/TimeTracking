import axios from "axios";
import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Button } from "reactstrap";
import Api_Url from "../../Helpers/Api_Url";
import GenerateHeaderData from "../../Helpers/GenerateHeaderData";
import TotalHoursCount from "../../Helpers/TotalHoursCount";
import ChangeYearMonthForm from "./ChangeYearMonthForm";
import DeviationList from "./DeviationList";
import MainUserinfo from "./MainUserinfo";

class Timereport extends React.Component {
  state = {
    report: [],
    deviationItems: [],
    existingDevitations: [],
    month: new Date(),
    sucess: ""
  };

  handleDayClick = this.handleDayClick.bind(this);

  componentDidMount = () => {
    const userId = localStorage.getItem("id");

    axios
      .get(`${Api_Url}/user/` + userId, { headers: GenerateHeaderData() })
      .then(res => {
        const deviationItems = res.data.deviationItems;
        const { id } = res.data;
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
          report: res.data
        });
      });
  };

  handleDayClick(absenceDate, { selected, disabled }) {
    if (disabled) {
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
      this.state.deviationItems.push({
        absenceDate: absenceDate,
        hours: "",
        description: ""
      });
      let sortDeviationItems = this.state.deviationItems;

      let sortedDeviationItems = sortDeviationItems.sort(
        (a, b) => b.absenceDate.getDate() - a.absenceDate.getDate()
      );

      this.setState({
        deviationItems: sortedDeviationItems
      });
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

        if (deviationItems === undefined)
          this.setState({
            deviationItems: []
          });

        if (deviationItems === undefined) return false;

        deviationItems.forEach(element => {
          element.absenceDate = new Date(element.absenceDate);
        });

        this.setState({
          report: data,
          deviationItems: deviationItems
        });
      })
      .catch(error => {
        if (error.response === undefined)
          return this.setState({
            error: ""
          });
        this.setState({
          error: error.response.data
        });
        if (
          error.response.data === "Token has expired logging you out in 5sec.."
        )
          return setTimeout(() => {
            this.logout();
          }, 5000);
        setTimeout(() => {
          this.setState({
            error: false
          });
        }, 5000);
      });
  };

  logout() {
    localStorage.clear();
    window.location.href = "/timetracker";
  }
  locale = "sv";
  render() {
    return (
      <div>
        <MainUserinfo
          totalHours={this.totalHours}
          attest={this.state.report.attest}
        />
        <div className="YearNavigation">
          <DayPicker
            selectedDays={this.state.deviationItems.map(x => x.absenceDate)}
            onDayClick={this.handleDayClick}
            month={new Date(this.state.month)}
            keepFocus={true}
            disabledDays={[
              {
                before: new Date(this.currentYear, this.currentMonth - 1, 1),
                after: new Date(this.currentYear, this.currentMonth + 1, 0)
              },
              { daysOfWeek: [0, 6] }
            ]}
            captionElement={({ date, localeUtils }) => (
              <ChangeYearMonthForm
                date={date}
                localeUtils={localeUtils}
                onChange={this.handleYearMonthChange}
              />
            )}
          />
        </div>
        <DeviationList
          deviationItems={this.state.deviationItems}
          handleDescriptionChange={this.handleDescriptionChange}
          handleHoursChange={this.handleHoursChange}
          handleSubmit={this.handleSubmit}
        />
        <div className="timereport-logout-button-div">
          <Button color="secondary" onClick={this.logout}>
            Logga ut
          </Button>
        </div>
      </div>
    );
  }
}
export default Timereport;
