import axios from "axios";
import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Button } from "reactstrap";
import Api_Url from "../../Helpers/Api_Url";
import GenerateHeaderData from "../../Helpers/GenerateHeaderData";
import TotalHoursCount from "../../Helpers/TotalHoursCount";
import DeviationList from "./DeviationList";
import MainUserinfo from "./MainUserinfo";

class Timereport extends React.Component {
  state = {
    report: [],
    deviationItems: [],
    existingDevitations: [],
    currentMonth: new Date(),
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
          currentMonth: this.state.currentMonth
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

  logout() {
    localStorage.clear();
    window.location.href = "/timetracker";
  }

  render() {
    return (
      <div>
        <MainUserinfo
          totalHours={this.totalHours}
          attest={this.state.report.attest}
        />
        <DayPicker
          selectedDays={this.state.deviationItems.map(x => x.absenceDate)}
          onDayClick={this.handleDayClick}
        />
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
