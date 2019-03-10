import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import Header from "../../Header";
import DeviationList from "./DeviationList";
import MainUserinfo from "./MainUserinfo";

class Timereport extends React.Component {
  state = {
    report: [],
    deviationItems: []
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
  logout() {
    localStorage.clear();
    window.location.href = "/timetracker";
  }

  render() {
    return (
      <div>
        <Header />
        <MainUserinfo />
        <DayPicker
          selectedDays={this.state.deviationItems.map(x => x.absenceDate)}
          onDayClick={this.handleDayClick}
        />
        <DeviationList deviationItems={this.state.deviationItems} />
        <div>
          <button onClick={this.logout}>Logga ut</button>
        </div>
      </div>
    );
  }
}
export default Timereport;
