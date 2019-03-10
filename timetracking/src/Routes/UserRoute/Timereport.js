import axios from "axios";
import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import Header from "../../Header";
import Api_Url from "../../Helpers/Api_Url";
import TotalHoursCount from "../../Helpers/TotalHoursCount";
import DeviationList from "./DeviationList";
import MainUserinfo from "./MainUserinfo";

class Timereport extends React.Component {
  state = {
    report: [],
    deviationItems: [],
    title: "Rapport",
    subtitle: "Här kan vi rapportera"
  };

  handleDayClick = this.handleDayClick.bind(this);

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
      .post(`${Api_Url}/report/addreport`, {
        report: this.state.report,
        deviationItems: this.state.deviationItems,
        firstname: localStorage.getItem("firstname"),
        lastname: localStorage.getItem("lastname"),
        userId: localStorage.getItem("id")
      })
      .then(res => {
        console.log(res);
      });
  };

  logout() {
    localStorage.clear();
    window.location.href = "/timetracker";
  }

  render() {
    return (
      <div>
        <Header title={this.state.title} subtitle={this.state.subtitle} />
        <MainUserinfo totalHours={this.totalHours} />
        <DayPicker
          selectedDays={this.state.deviationItems.map(x => x.absenceDate)}
          onDayClick={this.handleDayClick}
        />
        <DeviationList
          deviationItems={this.state.deviationItems}
          addDeviations={this.addDeviations}
          handleDescriptionChange={this.handleDescriptionChange}
          handleHoursChange={this.handleHoursChange}
          handleSubmit={this.handleSubmit}
        />
        <div>
          <button onClick={this.logout}>Logga ut</button>
        </div>
      </div>
    );
  }
}
export default Timereport;
