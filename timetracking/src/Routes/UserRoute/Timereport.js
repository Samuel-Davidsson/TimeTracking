import axios from "axios";
import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import Header from "../../Header";
import Api_Url from "../../Helpers/Api_Url";
import GenerateHeaderData from "../../Helpers/GenerateHeaderData";
import TotalHoursCount from "../../Helpers/TotalHoursCount";
import DeviationList from "./DeviationList";
import MainUserinfo from "./MainUserinfo";

class Timereport extends React.Component {
  state = {
    report: [],
    deviationItems: [],
    currentMonth: new Date(),
    title: "Månadens Rapport",
    subtitle: "Fyll i din frånvaro här senast den sista dagen varje månad"
  };

  handleDayClick = this.handleDayClick.bind(this);

  componentDidMount = () => {
    const userId = localStorage.getItem("id");

    axios
      .get(`${Api_Url}/user/` + userId, { headers: GenerateHeaderData() })

      .then(res => {
        const deviationItems = res.data.deviationItems;
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
      .post(`${Api_Url}/report/addreport`, {
        report: this.state.report,
        deviationItems: this.state.deviationItems,
        firstname: localStorage.getItem("firstname"),
        lastname: localStorage.getItem("lastname"),
        userId: localStorage.getItem("id"),
        currentMonth: this.state.currentMonth
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
        <div>
          <button onClick={this.logout}>Logga ut</button>
        </div>
      </div>
    );
  }
}
export default Timereport;
